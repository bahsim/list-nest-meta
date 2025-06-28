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

function cleanYamlResponse(response: string): string {
  return response
    .replace(/^```yaml\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

async function processIntent(intent: any, sourceFile: string) {
  const parentIntentId =
    intent.id || slugify(intent.title || intent.name || "intent");
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

  const outputFile = path.join(OUTPUT_DIR, `${parentIntentId}-atomic.yaml`);
  if (fs.existsSync(outputFile) && !OVERWRITE) {
    log(`File exists, skipping: ${outputFile}`);

    return;
  }

  if (DRY_RUN) {
    log(`--- DRY RUN OUTPUT for ${parentIntentId} ---`);
    log(yaml.dump({ atomic_intents: parsed.atomic_intents }));
  } else {
    writeYaml(outputFile, { atomic_intents: parsed.atomic_intents });
    log(`Wrote: ${outputFile}`);
  }
}

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
