# Unified Intent Migration Plan: From Epics to Domain-Level Artifacts

## Rationale
Migrating from epic-based intent files to modular, domain-level unified-intent files enables:
- Clean, scalable, and maintainable structure
- Full alignment with AI-native, generative, and traceable workflows
- Preservation of history and context from existing epics
- Easier review, enrichment, and validation of requirements

## Step-by-Step Migration Process
1. **Preparation**
   - Review and catalog all existing epic-based intent files.
   - Define the set of major system domains (e.g., User Management, Notifications, Lists & Items, etc.).
   - Create a `/unified-intent/` directory for new domain files.

2. **Domain File Creation**
   - For each domain, create a new YAML file (e.g., `user-management.yaml`).
   - Use the canonical structure from `unified-intent-structure-guide.md`.

3. **Intent Extraction & Mapping**
   - For each epic, extract actionable intents and map them to the appropriate domain file.
   - Enrich each intent with vertical slice fields, action types, dependencies, and traceability info.
   - Normalize format (YAML, consistent field names, etc.).

4. **Aggregation & Indexing**
   - Create a root `unified-intent-index.yaml` to reference all domain files and map cross-domain dependencies.
   - Ensure all links and references are valid and up to date.

5. **Review & Validation**
   - Peer review each new domain file for completeness, accuracy, and adherence to structure.
   - Validate that all actionable requirements from epics are represented and traceable.
   - Run automated checks (if available) for structure, links, and field consistency.

6. **Transition & Communication**
   - Communicate the migration plan and progress to all stakeholders.
   - Update documentation and onboarding materials to reference the new unified-intent structure.
   - Archive or deprecate old epic files only after successful migration and validation.

## Roles & Responsibilities
- **Migration Lead:** Oversees the process, resolves ambiguities, and ensures quality.
- **Domain Curators:** Extract, enrich, and review intents for their assigned domain.
- **AI Agent(s):** Assist with extraction, normalization, and validation; suggest improvements.
- **Reviewers:** Peer review and validate migrated domain files.

## Risks & Mitigations
- **Risk:** Loss of context or requirements during migration
  - **Mitigation:** Peer review, traceability checks, and preservation of original epic files
- **Risk:** Inconsistent structure or field usage
  - **Mitigation:** Use canonical structure, run automated checks, and provide clear examples
- **Risk:** Stakeholder confusion or resistance
  - **Mitigation:** Communicate early, provide training, and document rationale/benefits

## Living Artifact Statement
This migration plan is a living document. Update it as new challenges, tools, or best practices emerge. The goal is a clean, generative, and explainable unified-intent system for all participants. 