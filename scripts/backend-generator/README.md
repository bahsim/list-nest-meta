# Backend Generator (AI-Driven)

## Purpose

The Backend Generator is a production-grade, AI-driven automation tool that generates granular, automatable instructions for backend development from atomic intent YAMLs. It leverages a pattern library and an LLM (e.g., OpenAI GPT-4) to ensure every step is context-aware, traceable, and ready for code generation or review.

---

## Why AI-Driven?
- LLMs (like GPT-4) can interpret new, never-seen-before atomic intents and generate creative, context-aware instructions.
- They adapt to evolving requirements without constant rule updates.
- This enables true intent-driven, future-proof backend automation.

---

## Pattern Libraries: Atomic vs. Mid-Level

- **Atomic Pattern Library:** Contains the most granular, step-by-step backend actions. Use for maximum control and fine-tuned automation.
- **Mid-Level Pattern Library (Recommended):** Contains composable, parameterized patterns that represent logical backend units (e.g., scaffold module, setup authentication). Use for optimal balance between abstraction and control.

**To use the mid-level pattern library:**
- Set `PATTERNS_FILE=./patterns/mid-level-patterns.yaml` in your `.env` file.
- The generator will produce instructions at the mid-level of abstraction, as recommended in the granularity tradeoff documentation.

---

## Requirements
- **Node.js**: v18 or higher recommended
- **TypeScript**: v4.9 or higher
- **Yarn** or **npm** for dependency management

---

## Directory Structure

```
backend-generator/
  ├── src/
  │   └── generate-instructions.ts
  ├── patterns/
  │   └── atomic-patterns.yaml
  ├── .env
  ├── package.json
  └── README.md
```
- **Atomic intents**: Place YAMLs in the folder specified by `SOURCE_DIR` (see .env)
- **Pattern library**: Place in `PATTERNS_FILE` (see .env)
- **Output**: Generated instructions will be written to `OUTPUT_DIR`

---

## Configuration
- Set your environment variables in a `.env` file:
  ```env
  SOURCE_DIR=../../../list-nest-docs/03-development/08-atomic-intents
  OUTPUT_DIR=../../../list-nest-docs/03-development/10-atomic-instructions
  PATTERNS_FILE=./patterns/mid-level-patterns.yaml
  OPENAI_API_KEY=sk-...
  ```
- **Security**: Never commit your `.env` file or API keys to version control. Use `.env.example` for templates.
- **Best Practice**: Restrict API key permissions and rotate keys regularly.

---

## Installation
1. Install all dependencies (including OpenAI SDK):
   ```sh
   npm install openai js-yaml dotenv
   npm install --save-dev typescript @types/node @types/js-yaml
   ```
2. (Optional) Initialize TypeScript if not already:
   ```sh
   npx tsc --init
   ```

---

## Usage
1. Build or run with ts-node:
   ```sh
   npm start
   # or
   ts-node-esm src/index.ts
   ```
2. Review the generated instructions in `OUTPUT_DIR`.

---

## Inputs & Outputs
- **Input:**
  - Atomic intent YAMLs (each with `id`, `description`, and any custom fields)
  - Pattern library YAML (atomic patterns)
- **Output:**
  - For each intent, a YAML file with a list of instructions (pattern + params)

---

## Example Mid-Level Pattern YAML
```yaml
mid_level_patterns:
  - id: scaffold_nestjs_module
    name: Scaffold NestJS Module
    description: Scaffold a new NestJS module with controller, service, and DTOs for a given entity.
    parameters:
      - entity_name
      - fields
      - endpoints
      - validation
      - rbac
      - openapi
  # ... more patterns ...
```

---

## Extending & Adapting
- Update your pattern library to add new mid-level patterns as your architecture evolves.
- Tune the LLM prompt for your domain or workflow.
- Add review/approval steps for LLM-generated instructions if needed.
- For batch/parallel processing, consider splitting input files and running multiple instances (future enhancement: add built-in parallelism).

---

## Error Handling & Logging
- All errors are logged with clear context (intent id, file, or error type).
- The script exits with a non-zero code on fatal errors.
- Review the summary at the end for mapped/unmapped intents.
- For debugging, add additional logging as needed in `generate-instructions.ts`.

---

## Troubleshooting
- **Module not found:**
  - Ensure you have run `npm install` and all dependencies are present.
  - If you see `Cannot find module 'openai'`, run:
    ```sh
    npm install openai
    ```
- **API key issues:**
  - Ensure `OPENAI_API_KEY` is set in your `.env` file.
  - Check for typos or expired keys.
- **YAML parsing errors:**
  - Validate your YAML files with a linter or online tool.
- **TypeScript errors:**
  - Ensure all `@types/*` packages are installed.
  - Use the correct Node.js and TypeScript versions.

---

## Reviewing & Validating LLM Output
- Always review generated instructions before using them in production.
- For critical flows, add a human-in-the-loop review step.
- Validate YAML output for correctness and completeness.

---

## Contributing & Code Style
- Follow the existing code style and TypeScript best practices.
- Use clear, descriptive variable and function names.
- Document all public functions and modules with JSDoc.
- One export per file; use PascalCase for classes, camelCase for variables/functions.
- See `src/generate-instructions.ts` for examples.

---

## Testing
- (Optional) Add unit tests for utility functions and integration tests for the generator.
- Use Jest or your preferred test runner.
- To run tests:
  ```sh
  npm test
  ```

---

## Updating Dependencies
- To update all dependencies:
  ```sh
  npm update
  ```
- To update a specific package:
  ```sh
  npm install <package>@latest
  ```

---

## Reporting Issues & Feature Requests
- Open an issue in the repository with clear steps to reproduce or a detailed feature description.
- Include logs, error messages, and environment details when reporting bugs.

---

## License & Authorship
- See `LICENSE` for license details.
- Maintained by the List-Nest project contributors.

---

## Minimal Example Atomic Intent YAML
```yaml
id: user-login-success
description: User can successfully log in with valid credentials.
entity: User
fields:
  - email
  - password
```

---

## Minimal Example Pattern Library YAML
```yaml
atomic_patterns:
  - id: add_route_to_controller
    name: Add Route to Controller
    description: Add a route handler to a NestJS controller.
    parameters:
      - controller
      - route
      - method
  - id: add_dto_file
    name: Add DTO File
    description: Create a DTO file for request/response validation.
    parameters:
      - file
      - fields
  # ...more patterns
```

---

## In Short
- Use the mid-level pattern library for optimal AI-driven backend generation.
- Configure, run, and review real output.
- For advanced automation, extend the pattern library and tune the LLM prompt as needed. 