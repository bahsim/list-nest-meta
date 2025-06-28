# Atomic Decomposition Script

This tool decomposes high-level intents into atomic, testable requirements using an LLM (OpenAI by default, pluggable). It is designed for the ListNest unified intent system but can be adapted for other projects.

---

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.

---

## Environment Variables

- `ATOMIC_SOURCE_DIR`: Path to directory containing high-level intent YAMLs.
- `ATOMIC_OUTPUT_DIR`: Path to output directory for atomic intent YAMLs.
- `LLM_PROVIDER`: LLM provider to use (default: `openai`).
- `LLM_API_KEY`: API key for the LLM provider.
- `DRY_RUN`: If `true`, print output instead of writing files.
- `OVERWRITE`: If `true`, overwrite existing atomic YAMLs.

---

## Usage

```sh
npm start
```

- The script will read all YAMLs from the source directory, call the LLM to generate atomic intents, and write new YAMLs to the output directory.
- Supports batch and single-file mode, dry-run, and overwrite options (see `.env`).

---

## Customizing the LLM Provider

- The script is designed to be pluggable. To use a different LLM provider, implement a new provider module and update the import in `index.ts`.
- API keys and provider selection are controlled via environment variables.

---

## Canonical Atomic Intent Definition

- All atomic intents must conform to the canonical definition and YAML structure described in `atomic-intent-definition.md` (see project documentation).

---

## Example YAML Output

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

# Output Strategy Commentary: Atomic Intent Decomposition

## Context

In the ListNest unified intent system, decomposing high-level intents into atomic, testable requirements is a critical step for ensuring clarity, traceability, and actionable development. The method by which these atomic intents are output—whether as new YAML files, appended to existing files, or simply printed for review—has significant implications for workflow, auditability, and collaboration.

## Output Options

### 1. Writing New YAMLs
- **Traceability & Auditability:** Each decomposition run produces a discrete artifact, preserving the state of requirements at a specific point in time. This is invaluable for audits, rollbacks, and understanding the evolution of requirements.
- **Parallel Workflow Support:** Multiple team members can review or edit atomic intents independently, reducing the risk of merge conflicts or accidental overwrites.
- **Safety:** The original high-level intent files remain untouched, minimizing the risk of data loss or corruption.
- **Review & Approval:** New files can be easily staged for review, approval, or further enrichment before being merged into the main requirements set.
- **Drawback:** File proliferation and management overhead; requires naming/archiving conventions.

### 2. Appending to Existing YAMLs
- **Centralization:** Related high-level and atomic intents are co-located, simplifying navigation and reporting.
- **Reduced File Sprawl:** Fewer files to manage.
- **Drawbacks:** Risk of data corruption, merge conflicts, and blurring of history; limited parallelism.

### 3. Printing Suggestions Only
- **Non-Destructive:** No files are changed, allowing for safe experimentation and review.
- **Immediate Feedback:** Teams can quickly iterate on decomposition logic or LLM prompts.
- **Drawbacks:** Manual overhead, no traceability, not suitable for audit or large-scale collaboration.

## Recommendation

**Writing new YAMLs is the preferred approach** for atomic intent decomposition. This maximizes traceability, supports robust review and rollback, and aligns with requirements engineering best practices for complex, evolving systems. While it introduces some file management overhead, the benefits in terms of auditability, safety, and parallel workflow support far outweigh the drawbacks.

## Practical Guidance for Teams

- **Adopt Naming Conventions:** Name atomic intent files after their parent intent ID or slug (e.g., `user-auth-atomic.yaml`) and include traceability fields (`parent_intent_id`, `source_high_level_file`).
- **Review & Approval:** Treat each new YAML as a discrete artifact for review and approval before merging.
- **Periodic Cleanup:** Regularly archive or clean up superseded atomic intent files to manage file sprawl.
- **Automate Where Possible:** Use scripts to generate, validate, and aggregate atomic intents, reducing manual overhead and error risk.

By following these practices, teams can ensure that atomic intent decomposition remains a scalable, auditable, and collaborative process, fully aligned with the goals of the unified intent system. 