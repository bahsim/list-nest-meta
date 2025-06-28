# Backend Regeneration Plan (/kupipodariday-backend-regen)

## Phase 1: Preparation
- [x] Ensure `/kupipodariday-backend-regen` exists and is empty or ready for code generation.
- [x] Gather the mid-level instructions from `be-reverse-engineering/03-mapping.md`.
- [x] Ensure the mid-level pattern library (YAML or code) is available for the generator.
- [x] Decide on the code generation approach:
  - Use an existing code generator (specify which one), or
  - Use a script/template to manually process the instructions and generate the code.
- [x] Confirm any customizations or constraints for the generated codebase (e.g., naming, structure, dependencies).

## Phase 2: Generation
- [x] For each instruction in the mapping:
  - Use the corresponding pattern from the pattern library to generate code (entities, controllers, services, DTOs, guards, strategies, etc.).
  - Place generated files in the appropriate structure inside `/kupipodariday-backend-regen/src/`.
- [x] Generate supporting files (e.g., `main.ts`, `app.module.ts`) as needed for a working NestJS app.

## Phase 3: Post-Processing
- [ ] Run code formatting and linting.
- [ ] Ensure all dependencies are listed in `package.json`.
- [ ] Add configuration files (`tsconfig.json`, `nest-cli.json`, etc.).

## Phase 4: Validation
- [ ] Compare the regenerated backend with the original for:
  - Structure
  - Feature completeness
  - Behavior
- [ ] Document findings, discrepancies, and recommendations for improving the pattern library or generation process.

## Next Steps
- [ ] Specify the code generator or script to use, and confirm the pattern library location.
- [ ] Confirm any required customizations or constraints.
- [ ] Begin the regeneration process step by step, documenting all outputs in `/kupipodariday-backend-regen`. 