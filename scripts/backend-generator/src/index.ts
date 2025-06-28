import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import { config as dotenvConfig } from "dotenv";
import OpenAI from "openai";

dotenvConfig();

// === CONSTANTS & CONFIG ===
const DEFAULT_SOURCE_DIR = path.join(__dirname, "../../08-atomic-intents");
const DEFAULT_OUTPUT_DIR = path.join(__dirname, "../../10-atomic-instructions");
const DEFAULT_PATTERNS_FILE = path.join(__dirname, "../patterns/atomic-patterns.yaml");
const OPENAI_MODEL = "gpt-4";
const INSTRUCTIONS_KEY = "instructions";

const SOURCE_DIR = process.env.SOURCE_DIR || DEFAULT_SOURCE_DIR;
const OUTPUT_DIR = process.env.OUTPUT_DIR || DEFAULT_OUTPUT_DIR;
const PATTERNS_FILE = process.env.PATTERNS_FILE || DEFAULT_PATTERNS_FILE;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set in environment");

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

main().catch((e) => {
  console.error("Fatal error:", e instanceof Error ? e.message : e);
  process.exit(1);
});

// === MAIN ===
async function main() {
  ensureDir(OUTPUT_DIR);
  const patternsFileContent = loadYaml(PATTERNS_FILE);
  if (!Array.isArray(patternsFileContent?.mid_level_patterns) || patternsFileContent.mid_level_patterns.length === 0) {
    throw new Error(`No mid_level_patterns found in ${PATTERNS_FILE}`);
  }
  const patterns = patternsFileContent.mid_level_patterns;
  const files = getYamlFiles(SOURCE_DIR);

  let mapped = 0, notMapped = 0;

  console.log("Current time:", new Date().toISOString());
  for (const file of files) {
    let doc: any;
    try {
      doc = loadYaml(file);
      // Support both single-intent and atomic_intents array
      const intents: any[] =
        Array.isArray(doc?.atomic_intents) && doc.atomic_intents.length > 0
          ? doc.atomic_intents
          : doc && doc.id
            ? [doc]
            : [];
      if (intents.length === 0) {
        console.warn(`Skipping file (no valid intent): ${file}`);
        continue;
      }
      for (const intent of intents) {
        if (!intent || !intent.id) {
          console.warn(`Skipping intent (missing id) in file: ${file}`);
          continue;
        }
        try {
          const instructions = await generateInstructionsWithLLM(intent, patterns);
          const outPath = path.join(OUTPUT_DIR, `${intent.id}-instructions.yaml`);
          writeYaml(outPath, { [INSTRUCTIONS_KEY]: instructions });
          mapped++;
          console.log(`✔ Mapped: ${intent.id}`);
        } catch (e) {
          notMapped++;
          const intentId = intent && intent.id ? intent.id : file;
          console.error(`✖ Failed for ${intentId}:`, e instanceof Error ? e.message : e);
        }
      }
    } catch (e) {
      notMapped++;
      console.error(`✖ Failed to process file ${file}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log("==== SUMMARY ====");
  console.log(`Processed: ${files.length}`);
  console.log(`Mapped:    ${mapped}`);
  console.log(`Not mapped:${notMapped}`);
  console.log("Current time:", new Date().toISOString());
}

// === LLM INTEGRATION ===
async function generateInstructionsWithLLM(
  intent: any,
  patterns: any
): Promise<any[]> {
  const prompt = `
You are an expert backend automation agent.
Given this atomic intent:
${yaml.dump(intent)}
And this pattern library:
${yaml.dump(patterns)}
Generate a YAML list of instructions (pattern + params) to implement the intent.
Respond ONLY with valid YAML. The YAML must have a top-level key 'instructions:' containing a list of instruction objects.
`;
  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
  });
  const content = response.choices[0].message.content || "";
  // Extract the first YAML block containing 'instructions:'
  const yamlMatch = content.match(/instructions:[\s\S]*?(?=\n\S|$)/);
  if (!yamlMatch) throw new Error("No valid YAML block with 'instructions:' found in LLM response");
  const parsed = yaml.load(yamlMatch[0]);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) || !(INSTRUCTIONS_KEY in parsed)) {
    throw new Error(`Malformed LLM response: missing '${INSTRUCTIONS_KEY}'`);
  }
  const instructions = (parsed as Record<string, unknown>)[INSTRUCTIONS_KEY];
  if (!Array.isArray(instructions)) {
    throw new Error(`'${INSTRUCTIONS_KEY}' is not an array in LLM response`);
  }
  return instructions;
}

// === UTILS ===
function loadYaml(filePath: string): any {
  return yaml.load(fs.readFileSync(filePath, "utf-8"));
}

function getYamlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) throw new Error(`Directory not found: ${dir}`);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
    .map((f) => path.join(dir, f));
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeYaml(filePath: string, data: any) {
  fs.writeFileSync(filePath, yaml.dump(data), "utf-8");
}
