import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Validates all atomic intent YAML files in a directory.
 * @param dir Directory containing YAML files.
 */
export function validateAtomicIntents(dir: string): void {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  let hasErrors = false;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let doc: any;
    try {
      doc = yaml.load(content);
    } catch (err) {
      console.error(`[${file}] Invalid YAML:`, err);
      hasErrors = true;
      continue;
    }
    if (!doc || !Array.isArray(doc.atomic_intents)) {
      console.error(`[${file}] Missing or invalid 'atomic_intents' root key (must be a YAML list).`);
      hasErrors = true;
      continue;
    }
    doc.atomic_intents.forEach((intent: any, idx: number) => {
      const prefix = `[${file}][intent #${idx}]`;
      // Required fields
      const requiredFields = [
        'id',
        'parent_intent_id',
        'description',
        'acceptance_criteria',
        'test_case_example',
        'decomposition_notes',
        'source_high_level_file',
        'ai_generated',
        'reviewed',
        'status',
      ];
      for (const field of requiredFields) {
        if (!(field in intent)) {
          console.error(`${prefix} Missing required field: ${field}`);
          hasErrors = true;
        }
      }
      // acceptance_criteria must be a YAML list
      if (!Array.isArray(intent.acceptance_criteria)) {
        console.error(`${prefix} 'acceptance_criteria' must be a YAML list.`);
        hasErrors = true;
      }
      // test_case_example must contain Given/When/Then
      if (typeof intent.test_case_example !== 'string' || !/Given[\s\S]*When[\s\S]*Then/.test(intent.test_case_example)) {
        console.error(`${prefix} 'test_case_example' must use Given/When/Then format.`);
        hasErrors = true;
      }
      // decomposition_notes should not be empty
      if (!intent.decomposition_notes || intent.decomposition_notes.trim().length === 0) {
        console.error(`${prefix} 'decomposition_notes' should not be empty and should include rationale, edge cases, or architectural context.`);
        hasErrors = true;
      }
      // status must be one of: todo, in_progress, done
      const validStatuses = ['todo', 'in_progress', 'done'];
      if (!validStatuses.includes(intent.status)) {
        console.error(`${prefix} 'status' must be one of: ${validStatuses.join(', ')}`);
        hasErrors = true;
      }
      // Optional but recommended
      if ('related_intents' in intent && !Array.isArray(intent.related_intents)) {
        console.warn(`${prefix} 'related_intents' should be a YAML list if present.`);
      }
      // docs_link and code_reference are optional, but warn if missing
      if (!('docs_link' in intent)) {
        console.warn(`${prefix} Consider adding 'docs_link' for traceability.`);
      }
      if (!('code_reference' in intent)) {
        console.warn(`${prefix} Consider adding 'code_reference' for traceability.`);
      }
    });
  }
  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('All atomic intent files passed validation.');
  }
}

// CLI usage
if (require.main === module) {
  const dir = process.argv[2];
  if (!dir) {
    console.error('Usage: node validate.js <directory>');
    process.exit(1);
  }
  validateAtomicIntents(dir);
} 