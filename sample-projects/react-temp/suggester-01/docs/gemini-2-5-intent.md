# Intent: Code Reuse Suggestion Tool

## 1. Introduction & Vision

The project's goal is to develop an intelligent tool that actively reduces code duplication across a large and fragmented ecosystem of React-based repositories, which includes micro-frontends, shared libraries, and git submodules. By proactively identifying and suggesting opportunities for code reuse, the tool aims to foster a more maintainable, consistent, and efficient codebase.

## 2. Core Functional Requirements

### 2.1. Metadata Management
The system shall maintain a central, queryable metadata store of all reusable code artifacts within the target repositories.

- **Artifacts to Index:** The store must index various types of code artifacts, including but not limited to:
    - React Components
    - React Hooks
    - Utility Functions
    - Helper Functions
    - TypeScript Types and Interfaces
- **Information to Capture:** For each artifact, the system must extract and store structured metadata, such as:
    - Symbol name and kind (e.g., "Component", "Hook").
    - A textual representation of its signature (e.g., parameters, return types, generics).
    - A snapshot of JSX for components or a normalized code snippet for functions/hooks.
    - Associated JSDoc or TSDoc documentation.
    - The relative file path of the source file.
    - A reference to the git commit hash at the time of extraction.
    - A record of file paths where the artifact is imported and used.

### 2.2. Code Analysis & Similarity Detection
The tool must be able to analyze new or modified code and determine if it is a potential duplicate of an existing artifact in the metadata store.

- **Similarity Checks:** The similarity analysis should consider multiple factors:
    - **Exact Matches:** Prioritize matches based on the artifact's name.
    - **Structural Similarity:** Identify code with similar structure, signatures (props, arguments), and logic, even if names differ.
    - **Semantic Similarity:** Identify code that is conceptually equivalent or serves the same purpose, even with different implementations.
- **Configurable Threshold:** The sensitivity of the similarity detection must be configurable, allowing administrators to define what level of similarity triggers a suggestion.

### 2.3. Suggestion Generation
When a high-confidence match is found, the system shall generate a clear and actionable suggestion for the developer.

- **Suggestion Content:** Each suggestion should include:
    - The name and location of the recommended reusable artifact.
    - A summary of the existing artifact's API or signature.
    - A brief comparison with the developer's current code.
    - A minimal guide or recommendation for migrating to the shared artifact.

## 3. Operating Modes & User Interfaces

The tool's suggestions must be delivered through multiple channels to integrate seamlessly into developer workflows.

- **CLI Tool:** A command-line interface must be available for:
    - Manually scanning specific files or directories.
    - Integration into pre-commit hooks to analyze staged changes.
- **IDE Extension:** An extension for popular IDEs (e.g., VS Code) shall provide real-time suggestions and hints directly in the editor as a developer writes code.
- **CI/CD Integration:** The tool must operate as an automated bot within the CI/CD pipeline (e.g., a GitHub Action) to:
    - Analyze changes in Pull Requests.
    - Post automated review comments with reuse suggestions.
    - Provide a summary status check on the PR.

## 4. Key Workflows

- **Initial Seeding:** The tool must provide a mechanism to perform an initial, full scan of all specified repositories to build the baseline metadata store.
- **Continuous Synchronization:** The metadata store must be kept up-to-date automatically. On every merge to a main branch, the tool shall analyze the changes and add, update, or deprecate metadata records accordingly.
- **Developer Feedback Loop:** The system should be ableto track developer interactions with suggestions (e.g., accepted or rejected) to help refine its suggestion heuristics over time.

## 5. Configuration

The tool's behavior must be customizable via a configuration file (`reuse-suggest.config.{json|ts}`). Configurable parameters shall include:
- The similarity threshold.
- The number of suggestions to return.
- File paths and patterns to ignore during scans.
- Toggles to enable or disable different operating modes (CLI, IDE, CI).

## 6. Security & Privacy

- **Local Analysis:** All code analysis must be performed locally on the developer's machine or on trusted, self-hosted infrastructure by default.
- **Data Privacy:** No source code shall be sent to third-party services unless explicitly configured and approved via a privacy flag (e.g., `allowRemote`).

## 7. Success Criteria

The effectiveness of the tool will be measured by the following key performance indicators:
- **Accuracy:** A false-positive suggestion rate below 5%.
- **Performance:**
    - IDE suggestion latency under 150ms.
    - CI/CD check completion under 60 seconds.
    - Metadata updates for a 5,000-file repository completing in under 2 minutes. 