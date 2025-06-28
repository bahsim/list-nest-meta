/**
 * Utility: Extract only the minimal, relevant fields from a high-level intent for LLM decomposition.
 * This reduces prompt size, cost, and ambiguity.
 * @param intent The high-level intent object.
 * @returns Minimal object with only title, description, and context/notes if present.
 */
export function extractRelevantIntentFields(intent: any): { title?: string; description?: string; context?: string; notes?: string } {
  const minimal: { title?: string; description?: string; context?: string; notes?: string } = {};
  if (intent.title) minimal.title = intent.title;
  if (intent.description) minimal.description = intent.description;
  if (intent.context) minimal.context = intent.context;
  if (intent.notes) minimal.notes = intent.notes;
  return minimal;
}

/**
 * Returns the canonical prompt for atomic intent decomposition.
 * Only the minimal, relevant fields are sent to the LLM.
 * @param intent The high-level intent object.
 * @param sourceFile The source YAML file name.
 */
export function getAtomicDecompositionPrompt(
  intent: any,
  sourceFile: string
): string {
  const minimalIntent = extractRelevantIntentFields(intent);
  return `You are an expert requirements engineer. Given the following high-level intent, decompose it into a set of atomic, testable intents. Each atomic intent must:
- Be the smallest, indivisible, and testable requirement.
- Include all required fields: id, parent_intent_id (set to the parent intent's id: '${intent.id}'), parent_file (set to the parent YAML file: '${sourceFile}'), description, acceptance_criteria (YAML list), test_case_example (Given/When/Then format), decomposition_notes (with rationale, edge cases, or architectural context, and explicit clarification of unique responsibility and boundaries), source_high_level_file, ai_generated (true), reviewed (false), status (e.g., todo, in_progress, done), related_intents (YAML list, required if part of a broader flow or shares logic with another), docs_link (optional).
- Conform to the canonical definition in atomic-intent-definition.md.
- Output as a YAML list under the key 'atomic_intents'.

Guidelines:
- parent_intent_id must always be set to '${intent.id}'.
- parent_file must always be set to '${sourceFile}'.
- Before generating a new atomic intent, check for existing similar or overlapping intents. If overlap is found, merge or clarify boundaries using decomposition_notes and related_intents.
- acceptance_criteria must be a YAML list, not a string.
- test_case_example must use Given/When/Then (BDD) format.
- decomposition_notes must clarify the unique responsibility of the intent and reference where related or supporting logic is handled (by intent ID or file).
- status should reflect workflow state (e.g., todo, in_progress, done).
- related_intents is required for any intent that is part of a multi-step flow or shares logic with another; otherwise, it is optional but recommended for traceability.

High-level intent:
${JSON.stringify(minimalIntent, null, 2)}

Source file: ${sourceFile}`;
}
