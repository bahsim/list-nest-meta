# AI-Agent Prompt: AI-Powered Code Reuse Assistant for a Large-Scale React Ecosystem

## 1. Project Vision

The primary goal is to create an intelligent assistant that combats code duplication within our large, fragmented ecosystem of React-based repositories (including microfrontends and shared submodules). This tool will proactively identify opportunities for code reuse by leveraging a pre-generated, centralized metadata store of all existing code patterns, components, hooks, and utilities. The end result will be a more maintainable, consistent, and efficient codebase.

---

## 2. System Architecture & Core Components

The system will be composed of four primary components that work in concert:

**A. Metadata Extractor/Generator**
- **Responsibility:** Scan specified repositories, parse React/TypeScript source code (using Abstract Syntax Trees), and extract structured metadata.
- **Extracted Data Points:**
  - For Components: Name, file path, props signature (including types), and exported name.
  - For Hooks: Name, file path, arguments, and return signature.
  - For Utilities: Function name, file path, signature.
  - **AI-Powered Semantic Analysis (Advanced):** Generate semantic embeddings (vectors) for each code artifact. This will enable a deeper, conceptual similarity search, moving beyond simple structural comparisons.

**B. Metadata Store**
- **Responsibility:** Persist and serve the extracted code metadata.
- **Technology:** A queryable, indexed database. A file-based solution like **SQLite** is ideal to start, as it's portable and performant.
- **Functionality:** It must support fast queries to find potential matches based on names, signatures, and semantic similarity. It should be updated transactionally.

**C. Similarity Engine**
- **Responsibility:** The core logic that determines if a new piece of code is a potential duplicate of existing code.
- **Methodology:** The engine will employ a hybrid approach to balance speed and accuracy:
  1.  **Structural Matching (Fast, MVP):** The initial check will compare names, function signatures, prop shapes, and other direct structural markers.
  2.  **Semantic Matching (Deeper, AI-Powered):** For more nuanced checks, it will use vector similarity search on the pre-calculated embeddings. The goal is to identify both:
      - **Near-Identical Logic:** Different implementations of the same core algorithm.
      - **Conceptual Equivalence:** Code artifacts that serve the same purpose despite having different names or structures (e.g., `useApiData` vs. `useRequest`).

**D. Developer-Facing Interfaces (Clients)**
The system's suggestions must be delivered through multiple channels to integrate seamlessly into developer workflows:
- **Integration with IDE Assistants (VS Code Copilot / Cursor):** Instead of a separate UI, the tool will integrate with the developer's existing AI assistant. It will provide its context-aware reuse suggestions through the assistant's native interface (e.g., chat, inline suggestions).
- **CLI Tool:** Allows for manual or scripted analysis of files, directories, or branches. This serves as the foundation for other integrations.
- **CI/CD Bot (e.g., GitHub Action):** Automatically scans pull requests for code duplication and posts comments with reuse suggestions.

---

## 3. Key Features & Workflows

**Workflow 1: Initial Metadata Seeding**
- A one-time command (`scan --all`) to run the Metadata Extractor across all specified repositories, performing a full scan to build the initial metadata database.

**Workflow 2: Keeping Metadata Fresh (via CI/CD)**
- Upon every merge to the main branch of any monitored repository, a CI/CD pipeline triggers the Metadata Extractor.
- The extractor intelligently analyzes the diff, adding/updating/removing metadata for the changed files, ensuring the database is always up-to-date.

**Workflow 3: Real-time Developer Assistance (via IDE Assistant)**
- As a developer works on new code, they can invoke their AI assistant (e.g., via a hotkey, command palette, or chat prompt in VS Code/Cursor).
- The assistant, now integrated with our tool, uses the current code context to query our backend Similarity Engine.
- If a high-confidence match is found, our tool provides the suggestion *to the assistant*. The assistant then presents it to the developer in its native UI, complete with a link to the existing code and AI-generated reasoning.

**Workflow 4: Automated PR Review (CI/CD Bot)**
- When a pull request is opened, the CI/CD bot is triggered.
- It uses the Similarity Engine to check each new code artifact in the PR's diff against the Metadata Store.
- If a potential duplicate is detected, the bot posts a helpful, automated comment on the PR.
  - **Example Comment:** "**AI-Powered Suggestion:** This `useFormValidation` hook appears conceptually similar to the existing `useFormState` hook in `@shared/forms`.<br/>**Reasoning:** Both hooks manage form input state and perform validation.<br/>**Recommendation:** Consider reusing `useFormState` to maintain consistency. [Link to `useFormState` source code]"

---

## 4. Technical Guidelines & Constraints

- **Technology Stack:**
  - **Core Logic:** **Node.js/TypeScript** is the required stack to keep it within the JavaScript ecosystem.
  - **Code Parsing:** Use a robust AST parser like **`@typescript-eslint/parser`**.
  - **Metadata Storage:** Begin with **SQLite**.
- **Security & AI Model Hosting:** Code analysis must be performed entirely on secure, approved infrastructure. No source code shall be sent to unauthorized third-party services. For AI model integration, this means one of two approved approaches:
  - **Self-Hosting:** Deploying open-source models on our internal infrastructure for maximum control.
  - **Secure Private Cloud:** Utilizing a pre-approved, private cloud endpoint (e.g., Azure OpenAI, AWS Bedrock) that guarantees data privacy and no-training on our data.
- **Repository Access:** The tool should be configured with a list of local filesystem paths to the repositories it needs to scan. It is not responsible for cloning or fetching repos.
- **Performance:**
  - IDE suggestions must appear in **under 500ms** to avoid disrupting developers.
  - CI/CD checks should complete efficiently by only analyzing diffs.

---

## 5. Suggested Phased Implementation Plan

This project should be built iteratively.

- **Phase 1: The Core Engine & CLI**
  - **Goal:** Establish the foundation.
  - Build the Metadata Extractor, SQLite schema, and the core Similarity Engine (structural matching only).
  - Implement a CLI with two commands: `scan <dir>` to populate the DB and `check <file>` to find duplicates.

- **Phase 2: CI/CD Integration**
  - **Goal:** Automate detection and developer feedback.
  - Create a GitHub Action that uses the CLI to scan PR diffs and post comments.
  - Implement the CI workflow to automatically update the metadata DB on merges.

- **Phase 3: Integration with IDE Assistants**
  - **Goal:** Seamlessly integrate reuse suggestions into the developer's existing AI-powered workflow.
  - **Tasks:**
    - Develop a service or API that existing assistants (like VS Code Copilot or Cursor) can query.
    - This involves exposing our Similarity Engine and creating the necessary interface for the IDE to communicate with it.
    - Document how developers can configure their IDE assistant to use this new internal capability.

- **Phase 4: Advanced Semantic Search**
  - **Goal:** Dramatically improve suggestion accuracy by understanding code intent.
  - **Tasks:**
    - Integrate an embeddings model (self-hosted or via a secure private cloud endpoint).
    - Update the Metadata Extractor to generate and store vectors for code artifacts.
    - Enhance the Similarity Engine to perform vector similarity searches.
    - Refine suggestion outputs to provide AI-powered explanations for why code is considered similar.

- **Phase 5: AI-Powered Developer Experience (Future)**
  - **Goal:** Go beyond detection and actively assist in code creation and maintenance.
  - **Potential Features:**
    - Auto-generate documentation and usage examples for new, unique components that are added to the metadata store.
    - Suggest refactoring snippets to help developers adopt the recommended reusable code. 