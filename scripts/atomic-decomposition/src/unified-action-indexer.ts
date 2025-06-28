import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Script: Unified Action Indexer
 * Scans all atomic intent YAML files in a directory, extracts unique actions,
 * and builds a unified action index for traceability and generative workflows.
 *
 * Directory and output file are configurable via environment variables:
 *   ATOMIC_SOURCE_DIR - directory containing atomic intent YAMLs
 *   UNIFIED_ACTION_INDEX_FILE - output file for the unified action index
 */

const ATOMIC_DIR = process.env.ATOMIC_OUTPUT_DIR || path.resolve(__dirname, process.env.ATOMIC_SOURCE_DIR || '');
const OUTPUT_FILE = path.join(ATOMIC_DIR, process.env.UNIFIED_ACTION_INDEX_FILE || '');

console.log(`ATOMIC_DIR: ${ATOMIC_DIR}`);
console.log(`OUTPUT_FILE: ${OUTPUT_FILE}`);
console.log('UNIFIED_ACTION_INDEX_FILE: ', process.env.UNIFIED_ACTION_INDEX_FILE);

interface AtomicIntentRef {
  file: string;
  id: string;
  description: string;
  domains?: string[];
}

interface UnifiedAction {
  id: string;
  description: string;
  atomic_intents: AtomicIntentRef[];
  domains: string[];
}

// Utility to slugify action descriptions for IDs
function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

const actionMap: Record<string, UnifiedAction> = {};

for (const file of fs.readdirSync(ATOMIC_DIR)) {
  if (!file.endsWith('.yaml')) continue;
  const filePath = path.join(ATOMIC_DIR, file);
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8')) as any;
  if (!doc || !Array.isArray(doc.atomic_intents)) continue;
  for (const intent of doc.atomic_intents) {
    // Use 'unified_action_id' if present, else generate from description
    const actionId = intent.unified_action_id || slugify(intent.description || intent.id || 'action');
    if (!actionMap[actionId]) {
      actionMap[actionId] = {
        id: actionId,
        description: intent.description || '',
        atomic_intents: [],
        domains: intent.domains ? [...intent.domains] : [],
      };
    }
    // Add file/id/description reference
    actionMap[actionId].atomic_intents.push({
      file,
      id: intent.id,
      description: intent.description || '',
      domains: intent.domains ? [...intent.domains] : undefined,
    });
    // Aggregate domains
    if (intent.domains) {
      for (const d of intent.domains) {
        if (!actionMap[actionId].domains.includes(d)) {
          actionMap[actionId].domains.push(d);
        }
      }
    }
  }
}

const unifiedActions = Object.values(actionMap);
fs.writeFileSync(OUTPUT_FILE, yaml.dump({ unified_actions: unifiedActions }), 'utf8');
console.log(`Unified action index written to: ${OUTPUT_FILE}`); 