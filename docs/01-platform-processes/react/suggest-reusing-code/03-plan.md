# Implementation Plan: Code Reuse Suggestion Tool

## 1. Define Metadata Schema
- Specify fields for each code pattern: type (component/hook/utility), name, signature/AST, description, usage examples, file path, and tags.
- Choose storage format (JSON or SQLite for MVP).

## 2. Metadata Extraction
- Build a TypeScript (or Node.js) script to scan the codebase and extract code patterns using AST parsing.
- Populate the metadata store with all existing components, hooks, and utilities.
- Schedule extraction to run on demand and after each merge (CI/CD).

## 3. Pattern Matching & Suggestion Engine
- Implement a matcher that compares new code patterns to existing metadata using signature similarity and optional AI/LLM semantic checks.
- When a match is found, generate a suggestion message with a link to the reusable code and usage context.

## 4. Workflow Integration
- **CLI Tool:** Allow developers to run duplication checks and get suggestions locally.
- **IDE Plugin (optional):** Provide inline suggestions as code is written.
- **CI/CD Bot:** On PRs, scan diffs, comment with reuse suggestions, and update metadata.

## 5. Feedback & Iteration
- Allow developers to accept, ignore, or provide feedback on suggestions.
- Use feedback to refine matching logic and improve future recommendations.
- Regularly review and update the metadata schema and extraction logic as the codebase evolves.

---

**MVP Focus:**
- Start with CLI and CI/CD integration.
- Use TypeScript for extraction and matching.
- Store metadata in JSON for simplicity.

**Future Enhancements:**
- Add semantic AI matching.
- Build IDE plugin.
- Support more languages and frameworks.
