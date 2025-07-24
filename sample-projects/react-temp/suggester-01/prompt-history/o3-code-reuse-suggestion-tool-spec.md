# Code Reuse Suggestion Tool – Technical Specification

## 1. Introduction
The **Code Reuse Suggestion Tool** is an autonomous utility designed to prevent code duplication across a constellation of React-based repositories (micro-frontends, shared libraries, git submodules). It continuously analyses code changes, matches new or modified code against a central metadata store of existing abstractions, and surfaces reuse recommendations when similarity exceeds a configurable threshold.

## 2. Mission Objectives
1. Maintain an up-to-date metadata store indexing every reusable artifact (components, hooks, utilities, helpers, types).
2. Intercept new or modified code (IDE, CLI, CI) and match its signature/pattern against the metadata.
3. When similarity ≥ _threshold_, surface a suggestion (with file/line, API summary, and minimal migration guide) to encourage reuse.
4. Evolve continuously: update metadata on every merge, prune dead entries, learn from accepted/rejected suggestions.

## 3. Operating Modes
| Mode | Entry-point | Description |
|------|-------------|-------------|
| CLI  | `reuse-suggest <paths>` | Local scan of specific paths or staged diff (pre-commit hook). |
| IDE Extension | VS Code LSP | Real-time hints while developers type. |
| CI/CD Bot | GitHub Action | PR review comments + summary status check. |

## 4. System Components
1. **Parser / Metadata Extractor**  
   • Parses TypeScript/JSX using _ts-morph_ (fallback: Babel).  
   • Extracts: symbol name & kind, signature (params/return/generics), JSX snapshot or code snippet, JSDoc/TSDoc, file path, git commit hash.
2. **Metadata Store**  
   • Default: `metadata.json` (monorepo root) for small-to-medium repos.  
   • Optional: `metadata.db` (SQLite) or Postgres for large installations.  
   • Provides CRUD + bulk import/export APIs.
3. **Similarity Engine**  
   • Primary: AST-based MinHash + Cosine similarity over structural tokens.  
   • Secondary (optional): LLM embedding index (FAISS/SQLite) for semantic matches.  
   • Threshold configurable via `reuse-suggest.config.{json|ts}`.
4. **Suggestion Service**  
   • Orchestrates analysis workflow, queries similarity engine, formats suggestions.  
   • Tracks developer feedback (accepted/rejected) to adjust heuristics.
5. **Interface Adapters**  
   • CLI Runner  
   • Git Hook Wrapper  
   • GitHub Action  
   • IDE Language Server Plugin

## 5. Data Model
```ts
interface MetadataRecord {
  id: string;               // UUID v4
  kind: "Component" | "Hook" | "Fn" | "Type";
  name: string;
  signature: string;        // textual representation
  jsxSnapshot?: string;     // for components
  codeSnippet: string;      // first N lines (normalized)
  jsDoc?: string;
  usageSites: string[];     // file paths where imported
  filePath: string;         // relative path
  commitHash: string;       // git hash at extraction time
  createdAt: string;        // ISO timestamp
  updatedAt: string;
  deprecated?: boolean;
}
```

### Similarity Indexes
- **structuralHash**: 128-bit MinHash of AST token sequence.  
- **embeddingVector** (optional): 768-dim float array stored in vector store.

## 6. Core Workflow
1. **Metadata Generation & Maintenance**
   1. Parse repo at merge time → produce `MetadataRecord[]`.
   2. Persist to store; update existing or insert new records.
   3. Recompute similarity hashes / embeddings.
2. **Suggestion Pipeline**
   1. Capture candidate code (buffer, staged diff, or PR patch).
   2. Normalize (Prettier format, strip comments) and extract AST signature.
   3. Generate structuralHash + optional embedding.
   4. Query metadata for nearest neighbours:
      - Exact name match → top priority.
      - Structural similarity ≥ threshold.
      - Embedding cosine ≥ 0.8 (if enabled).
   5. Produce top-_k_ suggestions with API summary & migration tips.
   6. Surface via relevant adapter (tooltip, CLI output, PR comment).

## 7. Configuration (\`reuse-suggest.config.ts\`)
```ts
export interface ReuseSuggestConfig {
  threshold: number;          // 0-1 (default 0.7)
  topK: number;               // suggestions to return (default 3)
  ignorePaths: string[];
  modeToggles: {
    cli: boolean;
    ide: boolean;
    ci: boolean;
  };
  allowRemote: boolean;       // privacy flag
}
```

## 8. Security & Privacy
- All analysis runs locally unless `allowRemote=true` is explicitly set.
- Proprietary strings in embeddings are salted & hashed.

## 9. KPIs
- False-positive rate < 5 %.
- IDE latency < 150 ms.
- CI run < 60 s.
- Metadata update < 2 min for 5k-file repo.

## 10. Implementation Roadmap
| Phase | Deliverable |
|-------|-------------|
| 1 | Specification document _(this file)_ |
| 2 | Data model & storage layer |
| 3 | Metadata extractor (ts-morph) + unit tests |
| 4 | Similarity engine (MinHash) + embeddings POC |
| 5 | CLI runner + pre-commit hook |
| 6 | GitHub Action integration |
| 7 | IDE extension (VS Code) |
| 8 | Documentation & diagrams |

## 11. Glossary
- **AST** – Abstract Syntax Tree.
- **MinHash** – Probabilistic data structure estimating Jaccard similarity.
- **FAISS** – Facebook AI Similarity Search (vector index).

---
© 2024 Reuse Suggestion Project 