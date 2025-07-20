## AI-Agent Prompt: Code Reuse Suggestion Tool

**Goal:**  
Build a tool that proactively suggests reusing existing code (components, hooks, utilities, etc.) instead of introducing duplicates in a React codebase, leveraging pre-generated metadata of code patterns.

---

### **Workflow & Requirements**

1. **Metadata Preparation**
   - Maintain a metadata store (JSON, DB, etc.) containing:
     - Extracted code patterns, signatures, and usage examples from the codebase.
     - Mapping of components, hooks, and utilities with their descriptions and usage contexts.
   - Update this metadata on every merge (CI/CD), analyzing diffs to add new patterns and remove obsolete ones.

2. **Code Authoring Assistance**
   - When a developer writes new code:
     - Extract the pattern/signature of the new code (via TypeScript AST, shell script, or AI).
     - Search the metadata for similar patterns or existing abstractions.
     - If a match is found, suggest reusing the existing code instead of duplicating logic.

3. **CI/CD Integration**
   - On every pull request or merge:
     - Scan the diff for new or changed code.
     - Compare with metadata to detect potential duplications.
     - Comment on the PR with suggestions for reuse and update the metadata accordingly.

4. **Extensibility**
   - The tool should be modular: support CLI, IDE plugin, and CI/CD bot modes.
   - All code analysis should be local or on a secure server; no code leaves the org unless configured.

---

### **Example User Story**

- As a developer, when I write a new custom hook, the tool checks if a similar hook already exists and suggests reusing it if found.
- As a reviewer, I see automated comments on PRs highlighting duplicated logic and recommending existing abstractions.

---

### **Implementation Hints**

- Use TypeScript scripts or shell scripts for pattern extraction and metadata management.
- Use AI/LLM for semantic similarity checks if needed.
- Store metadata in a simple, queryable format (JSON, SQLite, etc.).
- Integrate with git hooks or CI/CD for automation.

---

**End of prompt.**