/**
 * Returns the canonical prompt for atomic intent decomposition.
 * @param intent The high-level intent object.
 * @param sourceFile The source YAML file name.
 */
export function getAtomicDecompositionPrompt(
  intent: any,
  sourceFile: string
): string {
  return `You are an expert requirements engineer. Given the following high-level intent, decompose it into a set of atomic, testable intents. Each atomic intent must:
- Be the smallest, indivisible, and testable requirement.
- Include all required fields: id, parent_intent_id, description, acceptance_criteria (YAML list), test_case_example (Given/When/Then format), decomposition_notes (with rationale, edge cases, or architectural context), source_high_level_file, ai_generated (true), reviewed (false), status (e.g., todo, in_progress, done), related_intents (YAML list, optional), docs_link (optional), code_reference (optional).
- Conform to the canonical definition in atomic-intent-definition.md.
- Output as a YAML list under the key 'atomic_intents'.

Guidelines:
- acceptance_criteria must be a YAML list, not a string.
- test_case_example must use Given/When/Then (BDD) format.
- decomposition_notes should include rationale, edge cases, or architectural context.
- status should reflect workflow state (e.g., todo, in_progress, done).
- related_intents, docs_link, and code_reference are optional but recommended for traceability.

High-level intent:
${typeof intent === "string" ? intent : JSON.stringify(intent, null, 2)}

Source file: ${sourceFile}`;
}
