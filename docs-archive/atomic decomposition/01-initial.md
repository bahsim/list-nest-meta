To address the requirement:

**"Decompose High-Level Intents into Atomic, Testable Requirements"**

---

## What is an Atomic Intent?

An **atomic intent** is the smallest, indivisible, and testable requirement describing a single, clear outcome or behavior expected from the system. Atomic intents are derived from high-level intents by decomposing broad goals into granular, actionable requirements that can be individually implemented, tested, and verified. For the full definition, characteristics, and examples, see [`atomic-intent-definition.md`](./atomic-intent-definition.md). All decomposition and review work must align with this canonical definition.

---

## 1. AI-Driven Decomposition Script/Workflow

- **Input:** High-level intent YAMLs (from your unified intent system).
- **Process:**  
  - For each high-level intent, the AI:
    - Reads the intent's description, acceptance criteria, and context.
    - Suggests a set of atomic, testable intents (each with a clear, actionable statement, acceptance criteria, and traceability to the parent).
    - Drafts these as new YAML entries, referencing the parent intent via a `parent_intent_id` and `source_high_level_file`.
    - Adds all required fields as per the canonical definition, including `id`, `description`, `acceptance_criteria`, `test_case_example` (optional), `decomposition_notes` (optional), `ai_generated`, and `reviewed`.
- **Output:**  
  - A new YAML file per high-level intent, written to `list-nest-docs/03-development/08-atomic-intents/`, ready for human review.

---

## 2. Human Review Workflow

- **Input:** Drafted atomic intents.
- **Process:**  
  - Reviewer checks each atomic intent for:
    - Clarity, testability, and atomicity (per the canonical definition).
    - Correct traceability to the parent.
    - No missing or redundant requirements.
  - Reviewer accepts, edits, or rejects each atomic intent and updates the `reviewed` flag.
- **Output:**  
  - Finalized atomic intents, ready for implementation and test automation.

---

## 3. YAML Template for Atomic Intents

See [`atomic-intent-definition.md`](./atomic-intent-definition.md) for the canonical YAML structure. Example:

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

## 4. Parallelization

- The process is parallelizable:  
  - Multiple high-level intents can be decomposed at once (by AI or by splitting files).
  - Multiple reviewers can work on different sets of atomic intents.

---

## Reference
- All decomposition, review, and implementation must conform to [`atomic-intent-definition.md`](./atomic-intent-definition.md) as the single source of truth for atomic intent structure and meaning.