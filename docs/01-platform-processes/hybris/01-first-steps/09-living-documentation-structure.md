# Living Documentation Structure

This structure supports traceability, auditability, and onboarding in your Hybris B2C project by linking each business intent to its implementation artifacts and validation.

---

## 1. Intent Registry (Central Index)
- **File:** `/docs/intents.yaml` or `/docs/intents.json`
- **Contents:**  
  - Unique intent ID  
  - Title & description  
  - Business outcome  
  - Stakeholders  
  - Status (draft, active, deprecated)  
  - Links to implementation artifacts

---

## 2. Intent Detail Pages (Markdown or HTML)
- **Location:** `/docs/intents/<intent-id>.md`
- **Contents:**  
  - Intent summary  
  - Business rationale  
  - Acceptance criteria  
  - Change history  
  - Implementation links:
    - **Code:** Source files, classes, modules
    - **Config:** Relevant YAML/JSON/config files
    - **Tests:** Unit, integration, BDD feature files
    - **Validation:** Test results, business outcome evidence
  - Related roadmap items or Jira tickets

---

## 3. Artifact Linking
- In each code/config/test file, add a comment or annotation referencing the intent ID (e.g., `@Intent: INT-001`).
- Use automated scripts to keep links up-to-date.

---

## 4. Business Validation & Audit Trail
- Document validation steps and results for each intent.
- Link to test reports, acceptance test runs, and business sign-off.
- Maintain a change log for each intent.

---

## 5. Onboarding Guide
- `/docs/onboarding.md` links to the intent registry and explains how to trace business goals to implementation.
- Include examples of how to navigate from intent to code, config, and tests.

---

**Summary:**  
This structure ensures every intent is traceable from business goal to implementation and validation, supporting auditability and fast onboarding. Living documentation is versioned, searchable, and updated as requirements evolve. 