# Atomic Intent Decomposition: Updated Plan

---

## 0. **What is an Atomic Intent?**
- An **atomic intent** is the smallest, indivisible, and testable requirement describing a single, clear outcome or behavior expected from the system.
- Atomic intents are derived from high-level intents by decomposing broad goals into granular, actionable requirements that can be individually implemented, tested, and verified.
- For the full definition, characteristics, and examples, see [`atomic-intent-definition.md`](./atomic-intent-definition.md). This file is the canonical reference for onboarding, review, and all decomposition work.

---

## 1. **LLM Provider: OpenAI by Default, Pluggable Design**
- The script will use the OpenAI API by default for atomic decomposition, but the LLM provider will be abstracted for easy replacement (Anthropic, Azure, local LLM, etc.).
- API keys and model selection will be configurable via environment variables or a config file.

---

## 2. **Output Strategy: New YAMLs per High-Level Intent**
- Each high-level intent will be decomposed into atomic intents, output as a new YAML file in `list-nest-docs/03-development/08-atomic-intents/`.
- File naming: `<parent_intent_id>-atomic.yaml` for clear traceability.
- Each atomic intent will include `parent_intent_id`, `source_high_level_file`, and a `reviewed` flag for human review tracking.
- This approach maximizes traceability, supports parallel review, and aligns with requirements engineering best practices.
- All atomic intents must conform to the definition and structure described in [`atomic-intent-definition.md`](./atomic-intent-definition.md).

---

## 3. **AI-Generated Fields for Atomic Intents**
- The AI will suggest all fields for each atomic intent:
  - `id`: Unique, human-readable identifier.
  - `parent_intent_id`: Reference to the high-level intent.
  - `description`: Clear, testable requirement.
  - `acceptance_criteria`: List of testable conditions.
  - `test_case_example`: (Optional) Example test scenario.
  - `decomposition_notes`: (Optional) Rationale, edge cases, or links to discussions.
  - `source_high_level_file`: For traceability.
  - `ai_generated`: Boolean flag for review tracking.
  - `reviewed`: Boolean flag, set to false by default, to be updated after human review.
- All fields and their intent must align with the canonical definition.

---

## 4. **Sample YAML Template for Atomic Intents**

```yaml
atomic_intents:
  - id: user-login-success
    parent_intent_id: user-authentication
    description: User can successfully log in with valid credentials.
    acceptance_criteria:
      - User provides valid email and password.
      - System authenticates and returns a session token.
      - User is redirected to the dashboard.
    test_case_example: |
      Given a registered user,
      When they submit correct credentials,
      Then they receive a valid session and access the dashboard.
    decomposition_notes: Handles only the success path; see related atomic intents for error cases.
    source_high_level_file: user-auth.yaml
    ai_generated: true
    reviewed: false
```

---

## 5. **Output Directory**
- All atomic YAMLs will be written to: `list-nest-docs/03-development/08-atomic-intents/`
- Each file: `<parent_intent_id>-atomic.yaml`

---

## 6. **Script Features & Flow**

### Features
- **Batch and Single-File Mode:** Process all YAMLs or a selected subset.
- **Overwrite/Skip/Append Options:** Choose what to do if the atomic YAML already exists.
- **Dry-Run Mode:** Print output to console without writing files.
- **Reviewed Flag:** Support for marking atomic intents as reviewed after human validation.
- **Logging:** Log all actions and errors for traceability.

### Flow
1. **Read** all high-level intent YAMLs from `07-unified-intent/` (batch or single-file).
2. **For each high-level intent:**
   - Send the intent (description, acceptance criteria, context) to the LLM.
   - Receive a list of atomic intents (in the above format).
   - Write to a new YAML in `08-atomic-intents/` (or print if dry-run).
3. **Log** all actions and any errors for review.

---

## Next Steps
- Maintain [`atomic-intent-definition.md`](./atomic-intent-definition.md) as the canonical source for atomic intent structure and meaning.
- Draft the script skeleton with the above features.
- Prepare a sample LLM prompt for atomic decomposition.
- Review and iterate on the script, prompt, and definition as needed.