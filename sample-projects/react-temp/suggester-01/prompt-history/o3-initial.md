🔧 Mixed AI-Agent Prompt  
Code Reuse Suggestion Tool for React Monorepos
------------------------------------------------

You are an autonomous engineering agent tasked with preventing code duplication across a constellation of React-based repositories (micro-frontends, shared libraries, git submodules). Build and operate a “Code Reuse Suggestion Tool” that detects when new code repeats an existing abstraction and proactively recommends reuse.

1. Mission Objectives  
• Maintain an up-to-date metadata store that indexes every reusable artifact (components, hooks, utilities, helpers, types).  
• Intercept new or modified code (IDE, CLI, CI) and match its signature/pattern against the metadata.  
• When similarity ≥ threshold, surface a suggestion (with file/line, API summary, and minimal migration guide) to reuse the existing artifact rather than add a duplicate.  
• Evolve continuously: update metadata on every merge, prune dead entries, learn from accepted/rejected suggestions.

2. Operating Modes  
• CLI: `reuse-suggest <paths>` for local scans or pre-commit hooks.  
• IDE extension: real-time hints as developers type.  
• CI/CD bot: PR reviews with inline comments and a summary status check.  

3. Core Workflow  

Metadata Generation & Maintenance  
a. Parse each repo at merge time using the TypeScript AST (or Babel) to extract:  
   – Symbol name & kind (Component | Hook | Fn | Type)  
   – Signature (params, return type) & generics  
   – JSX snapshot (for components) or code snippet for hooks/fns  
   – JSDoc/TSDoc description & first-party usage sites  
   – File path & git commit hash  
b. Persist records in `metadata.db` (SQLite) or `metadata.json` (monorepo root).  
c. On every merge:  
   – Diff the PR; add new symbols, deprecate removed ones.  
   – Recompute similarity hashes (e.g., AST-based MinHash + Cosine Sim).  

Suggestion Pipeline  
a. Capture candidate code (file buffer in IDE, staged diff in CLI, or PR patch in CI).  
b. Normalize (format, strip comments), derive its AST signature, and generate hashes/embeddings.  
c. Query metadata for nearest neighbors by:  
   – Exact name match → high priority  
   – Signature + structural similarity (AST tokens)  
   – Embedding cosine ≥ 0.8 → potential duplicate  
d. For top-k matches produce a suggestion:  
   ```
   🚀 Reuse candidate found: Shared/useDebounce (shared/hooks/useDebounce.tsx)  
   Signature: (callback: () => void, delay: number) => () => void  
   Your code: useDebounceLocal (src/foo/useDebounceLocal.tsx)  
   Consider importing the shared hook to avoid code drift.
   ```
e. Surface the message in the relevant mode (hover tooltip, CLI output, or PR comment).

4. Implementation Checklist  
☑ Parser/Extractor: TypeScript + ts-morph or Babel.  
☑ Similarity Engine:  
   – Structural hash (e.g., w/ jscodeshift)  
   – Optional LLM embedding + FAISS/SQLite vector store for semantic matches.  
☑ Metadata Store: pluggable driver (JSON file by default; swap to SQLite/Postgres for scale).  
☑ CLI & Git Hooks: Node script callable via `npx reuse-suggest --staged`.  
☑ CI Bot: GitHub Action posting review comments via REST/GraphQL.  
☑ IDE Plugin: VS Code extension leveraging Language Server Protocol (optional phase-2).

5. Security & Privacy  
• All analysis runs on trusted infra or the developer’s machine; no source code leaves the org unless `ALLOW_REMOTE=true`.  
• Sanitise and hash proprietary strings before embedding if remote vector DB is used.

6. Extensibility  
• Framework-agnostic core; React-specific enrichers live in `plugins/react`.  
• Add language adapters (Vue/Angular) by implementing `IExtractor` and `ISimilarityEngine`.  
• Configuration via `reuse-suggest.config.{json|ts}` (thresholds, ignore-paths, mode toggles).

7. Success Criteria & KPIs  
• False-positive rate < 5 % (measured via developer feedback reactions).  
• Median suggestion latency IDE < 150 ms, CI run < 60 s.  
• Metadata update completes in < 2 min per merge for 5000-file repo.

8. Deliverables  
• Source code (monorepo package `tools/reuse-suggest`).  
• GitHub Action workflow `reuse-suggest.yml`.  
• VS Code extension package.  
• Documentation: README + Architecture diagram + Contribution guide.  

---  
Execute autonomously: implement, test, document, and integrate the Code Reuse Suggestion Tool following the above specification.