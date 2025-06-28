import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import dotenv from "dotenv";
import { callLLM } from "./llm-provider.js";
import { getAtomicDecompositionPrompt } from "./prompt.js";
import { validateAtomicIntents } from "./validate.js";

dotenv.config();

const SOURCE_DIR = process.env.ATOMIC_SOURCE_DIR || "";
const OUTPUT_DIR = process.env.ATOMIC_OUTPUT_DIR || "";
const DRY_RUN = process.env.DRY_RUN === "true";
const OVERWRITE = process.env.OVERWRITE === "true";

main().catch((err) => {
  log("Error: " + err);
  process.exit(1);
});

async function main() {
  log("Starting atomic intent decomposition...");

  const files = getHighLevelIntentFiles();

  for (const file of files) {
    log(`Processing: ${file}`);
    const doc = readYaml(file);
    let intents: any[] = [];

    if (Array.isArray(doc)) {
      intents = doc;
    } else if (typeof doc === "object" && doc !== null) {
      // Assume first key is the intent list
      const firstKey = Object.keys(doc)[0];

      if (Array.isArray(doc[firstKey])) {
        intents = doc[firstKey];
      } else {
        log(`No intent array found in ${file}`);
        continue;
      }
    } else {
      log(`Unrecognized YAML structure in ${file}`);
      continue;
    }

    for (const intent of intents) {
      await processIntent(intent, path.basename(file));
    }
  }

  log("Decomposition complete.");

  // Post-generation validation step
  try {
    validateAtomicIntents(OUTPUT_DIR);
  } catch (err) {
    log("Validation failed. See errors above.");
    process.exit(1);
  }
}

async function processIntent(intent: any, sourceFile: string) {
  const parentIntentId =
    intent.id || slugify(intent.title || intent.name || "intent");
  const outputFile = path.join(OUTPUT_DIR, `${parentIntentId}-atomic.yaml`);
  const parentFilePath = path.join(SOURCE_DIR, sourceFile);
  // Early skip: If file exists and OVERWRITE is false, skip all processing for this intent
  if (fs.existsSync(outputFile) && !OVERWRITE) {
    log(`File exists, skipping: ${outputFile}`);
    return;
  }
  const prompt = getAtomicDecompositionPrompt(intent, sourceFile);

  log(`Calling LLM for intent: ${parentIntentId}`);

  let llmResponse: string;
  try {
    llmResponse = await callLLM(prompt);
  } catch (err) {
    log(`LLM call failed for ${parentIntentId}: ${err}`);
    return;
  }

  let parsed: any;
  try {
    parsed = yaml.load(cleanYamlResponse(llmResponse));
  } catch (err) {
    log(`YAML parse error for LLM response (${parentIntentId}): ${err}`);
    log("Raw LLM response:\n" + llmResponse);
    return;
  }

  if (
    !parsed ||
    !parsed.atomic_intents ||
    !Array.isArray(parsed.atomic_intents)
  ) {
    log(
      `No valid 'atomic_intents' found in LLM response for ${parentIntentId}`
    );
    log("Raw LLM response:\n" + llmResponse);
    return;
  }

  // Post-process atomic intents: enforce parent_intent_id and parent_file
  parsed.atomic_intents.forEach((ai: any) => {
    ai.parent_intent_id = parentIntentId;
    ai.parent_file = sourceFile;
  });

  if (DRY_RUN) {
    log(`--- DRY RUN OUTPUT for ${parentIntentId} (atomic) ---`);
    log(yaml.dump({ atomic_intents: parsed.atomic_intents }));
  } else {
    writeYaml(outputFile, { atomic_intents: parsed.atomic_intents });
    log(`Wrote: ${outputFile}`);
  }

  // Update parent YAML file with atomic_intents for this intent
  let parentDoc = readYaml(parentFilePath);
  let parentKey = Object.keys(parentDoc)[0];
  let parentList = parentDoc[parentKey];
  if (!Array.isArray(parentList)) {
    log(`Parent YAML structure not recognized for ${sourceFile}`);
    return;
  }
  let updated = false;
  for (let i = 0; i < parentList.length; i++) {
    if (parentList[i].id === parentIntentId) {
      parentList[i].atomic_intents = parsed.atomic_intents.map((ai: any) => ({
        id: ai.id,
        file: path.basename(outputFile),
      }));
      updated = true;
      break;
    }
  }
  if (!updated) {
    log(`Parent intent ${parentIntentId} not found in ${sourceFile}`);
    return;
  }
  if (DRY_RUN) {
    log(`--- DRY RUN OUTPUT for ${parentIntentId} (parent) ---`);
    log(yaml.dump(parentDoc));
  } else {
    writeYaml(parentFilePath, parentDoc);
    log(`Updated parent file: ${parentFilePath}`);
  }
  // Log summary
  log(`Summary for ${parentIntentId}:`);
  log(`  Atomic file: ${outputFile}`);
  log(`  Parent file: ${parentFilePath}`);
  log(`  Atomic children: ${parsed.atomic_intents.map((ai: any) => ai.id).join(", ")}`);
}

function cleanYamlResponse(response: string): string {
  return response
    .replace(/^```yaml\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

function log(msg: string) {
  console.log(`[atomic-decomposition] ${msg}`);
}

function getHighLevelIntentFiles(): string[] {
  return fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => path.join(SOURCE_DIR, f));
}

function readYaml(filePath: string): any {
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

function writeYaml(filePath: string, data: any) {
  fs.writeFileSync(filePath, yaml.dump(data), "utf8");
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
