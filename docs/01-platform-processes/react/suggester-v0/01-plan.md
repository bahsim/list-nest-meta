Building a proactive code reuse suggestion tool is a fantastic way to improve codebase quality and developer velocity. Before I draft a comprehensive implementation plan, I need to ensure my approach aligns perfectly with your vision. After analyzing your request and the repository structure, I have a few clarifying questions:

1.  **Target React Project:** Your request focuses on a React codebase. Should I develop this tool against a specific existing project, or would it be better to create a new, small sample React application under the `sample-projects/` directory for demonstration and testing purposes?
2.  **Metadata Storage:** For the initial version of the metadata store, a structured JSON file seems like a pragmatic starting point that's easy to manage and version control. Do you agree with this, or would you prefer a more robust database solution like SQLite from the outset?
3.  **Pattern Extraction Method:** You've outlined several options for pattern extraction. I propose a hybrid approach: using TypeScript's AST for precise structural analysis (e.g., extracting component props, hook signatures) and leveraging an LLM for generating semantic descriptions or embeddings to find conceptually similar code. Is this combination of syntactic and semantic analysis aligned with your expectations?
4.  **Initial Implementation Focus:** The tool has potential as a CLI, IDE plugin, and CI bot. To start, I suggest we build a powerful CLI tool that can generate the metadata and analyze code for duplicates. This CLI can then be easily integrated into a CI workflow. We can treat the IDE plugin as a potential future enhancement. Does this phased approach sound reasonable to you?
5.  **Similarity Criteria:** When comparing code, the tool could range from flagging only exact duplicates to identifying broader conceptual similarities. Initially, should the tool be conservative and only suggest reuse for code with very high structural and semantic similarity, or should it be more aggressive in its suggestions?
6.  **Project Structure:** I plan to create a new, self-contained TypeScript project for this tool within the `scripts/` directory, similar to the existing `backend-generator`. This will encapsulate its dependencies and logic. Does this organizational approach fit with your vision for the repository?

Once I have your feedback, I will draft a detailed plan for your approval.

Thank you for the clarifications. Your feedback is crucial for shaping a tool that meets your needs.

Based on your answers, I have drafted a comprehensive plan of action. Please review it, and if it aligns with your vision, I will begin the implementation.

### **Plan of Action**

**Phase 1: Project Setup & Scaffolding (Est. Time: < 1 hour)**
*   **Step 1.1: Create a Sample React Project.**
    *   I will use Vite to scaffold a new TypeScript-based React application at `sample-projects/react-sample`.
    *   This project will be populated with a few simple components, custom hooks, and utility functions to serve as a realistic testbed for our tool. I will deliberately include a couple of similar components to validate the duplication detection logic.
*   **Step 1.2: Create the Code Reuse Suggester Tool Project.**
    *   A new directory, `scripts/code-reuse-suggester`, will be created to house the tool.
    *   I will initialize a self-contained TypeScript project within this directory, setting up `package.json`, `tsconfig.json`, and installing core dependencies like `typescript`, `@types/node`, and `commander` for building the CLI.

**Phase 2: Metadata Generation (Est. Time: 2-3 hours)**
*   **Step 2.1: Implement AST-based Code Parser.**
    *   I will use `ts-morph`, a robust library for traversing and analyzing TypeScript's Abstract Syntax Tree (AST).
    *   A script will be developed to systematically scan the sample React project's source files (`.tsx`, `.ts`) and extract structural information about React components (names, props), custom hooks (names, arguments), and utility functions.
*   **Step 2.2: Implement LLM-based Semantic Analysis (Placeholder).**
    *   A module will be created to generate a concise, one-sentence semantic description for each identified code pattern. Initially, this will be a straightforward implementation (e.g., extracting JSDoc comments or making a placeholder call) to establish the architecture for future, more advanced LLM integration.
*   **Step 2.3: Structure and Save Metadata.**
    *   I will define clear TypeScript interfaces for our metadata.
    *   The tool will process the extracted structural and semantic information and save it into a `metadata/` directory. To adhere to your request for smaller files, the metadata will be split by type (e.g., `metadata/components.json`, `metadata/hooks.json`, `metadata/utils.json`).

**Phase 3: Duplicate Detection Logic (Est. Time: 2-3 hours)**
*   **Step 3.1: Develop Code Analysis for New/Changed Files.**
    *   The CLI tool will be designed to accept a file path as input. It will then use the same parsing logic from Phase 2 to analyze the contents of that specific file.
*   **Step 3.2: Implement Hybrid Similarity Scoring.**
    *   I will create a `SimilarityScorer` service to compare new code against the existing metadata.
    *   **Structural Score:** Will be calculated by comparing AST-derived signatures (e.g., comparing prop names and types).
    *   **Semantic Score:** Will be calculated by comparing the generated descriptions (e.g., using string similarity).
    *   These two scores will be combined into a single, configurable similarity rating.
*   **Step 3.3: Introduce a Configurable Similarity Threshold.**
    *   To address your uncertainty about similarity criteria, the tool will include a configurable threshold (e.g., via a CLI flag or config file). We will start with a conservative default setting to ensure high-confidence suggestions.

**Phase 4: CLI Implementation & Documentation (Est. Time: 1-2 hours)**
*   **Step 4.1: Build User-Friendly CLI Commands.**
    *   Using the `commander` library, I will expose two primary commands:
        1.  `generate-metadata <path_to_react_project>`: To execute the metadata extraction process.
        2.  `analyze <path_to_file>`: To run the duplication analysis on a given file.
*   **Step 4.2: Format and Present Suggestions.**
    *   When the `analyze` command identifies a likely duplicate, it will output a clear, actionable message to the console, guiding the developer on how to reuse existing code.
*   **Step 4.3: Provide Comprehensive Documentation.**
    *   A `README.md` file will be created for the `code-reuse-suggester` tool, detailing its purpose, installation, and usage instructions.

After completing these phases, I will provide a detailed analysis of the final implementation, reflecting on its scalability and maintainability, and suggest concrete next steps for its evolution.

Do you approve this plan?