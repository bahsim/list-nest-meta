# Generative Action Types in Unified Intent: Self-Explanatory Reference

## Introduction: Why Action Types?

In an AI-native, intent-driven system, **action types** are the building blocks that make requirements generative, traceable, and explainable. They provide a shared vocabulary for both humans and AI agents to describe, tag, and reason about what needs to be built, tested, and documented—across all layers of the system. Action types enable:
- Automated code, test, and doc generation
- Traceability from requirements to implementation
- Vertical slicing and cross-domain reasoning
- Systematic evolution as the system grows

This document is a living, narrative-driven reference for the canonical action types used in unified intent. It explains not just what they are, but why they matter and how to use them in practice.

---

## How to Use Action Types
- **Tag each intent** with one or more `action_types` to clarify what generative work is required.
- **Drive automation:** Use action types to trigger code, test, and doc generators.
- **Enable traceability:** Link every artifact (code, test, doc) back to its intent and action type.
- **Evolve the system:** Add, refine, or split action types as new needs emerge.

**Anti-pattern:** Avoid using action types as mere labels or checkboxes. They should drive real generative and traceability workflows.

---

## Canonical Action Types (with Rationale)

### 1. Entity/Model Definition
- **Why:** Every system starts with data. Defining or extending entities/models is foundational for all other actions.
- **Problem Solved:** Ensures data structure is explicit, versioned, and testable.
- **Lifecycle Fit:** Triggers migrations, schema validation, and downstream CRUD/API work.

### 2. CRUD Operations
- **Why:** Most business logic involves creating, reading, updating, or deleting data.
- **Problem Solved:** Standardizes how entities are manipulated and exposed.
- **Lifecycle Fit:** Drives endpoint, UI, and test generation.

### 3. Attribute/Field Extension
- **Why:** Systems evolve by adding new fields or metadata.
- **Problem Solved:** Makes schema evolution explicit and traceable.
- **Lifecycle Fit:** Triggers migrations, API changes, and UI updates.

### 4. Workflow/Process Automation
- **Why:** Many features require automation (recurring jobs, state transitions).
- **Problem Solved:** Encapsulates business processes for generative automation.
- **Lifecycle Fit:** Drives scheduler, event, and notification logic.

### 5. Validation & Business Logic
- **Why:** Data and actions must be correct and compliant.
- **Problem Solved:** Centralizes rules, constraints, and error handling.
- **Lifecycle Fit:** Drives validation code, error messages, and test cases.

### 6. API Endpoint Implementation
- **Why:** APIs are the contract between frontend, backend, and integrations.
- **Problem Solved:** Ensures endpoints are explicit, documented, and testable.
- **Lifecycle Fit:** Triggers codegen, contract tests, and doc updates.

### 7. UI/UX Flow Implementation
- **Why:** User experience is as important as backend logic.
- **Problem Solved:** Makes UI flows, forms, and feedback generative and testable.
- **Lifecycle Fit:** Drives component, state, and accessibility code.

### 8. Integration
- **Why:** Modern systems connect to other services and modules.
- **Problem Solved:** Makes integration points explicit and testable.
- **Lifecycle Fit:** Triggers API client, webhook, and adapter generation.

### 9. Notification/Communication
- **Why:** Users and systems need to be informed of events.
- **Problem Solved:** Centralizes notification logic for automation and compliance.
- **Lifecycle Fit:** Drives notification, email, and in-app message code.

### 10. Analytics & Event Tracking
- **Why:** Observability and measurement are key to improvement.
- **Problem Solved:** Ensures events and metrics are emitted and tracked.
- **Lifecycle Fit:** Drives analytics hooks, dashboards, and reporting.

### 11. Testing & Validation Automation
- **Why:** Quality and safety require automated tests.
- **Problem Solved:** Makes test coverage explicit and generative.
- **Lifecycle Fit:** Triggers unit, integration, and E2E test generation.

### 12. Documentation & Explainability
- **Why:** Every feature must be explainable to humans and AI.
- **Problem Solved:** Ensures docs, diagrams, and guides are always up to date.
- **Lifecycle Fit:** Drives doc generation and explainability checks.

### 13. Access Control & Security
- **Why:** Permissions and security are cross-cutting and critical.
- **Problem Solved:** Makes access rules explicit and testable.
- **Lifecycle Fit:** Drives guard, policy, and audit code.

### 14. Error Handling & Edge Case Management
- **Why:** Robust systems handle the unexpected.
- **Problem Solved:** Centralizes error and edge case logic for resilience.
- **Lifecycle Fit:** Drives error handling, fallback, and user feedback code.

---

## Example: Action Types in a Real Intent (YAML)

```yaml
id: invite_user_to_space
summary: Allow a user to invite another user to a space via email
vertical_slice:
  user_story: "As a space owner, I want to invite users so we can collaborate."
  ui/ux: "Invitation form, validation, error/success UI, accessibility"
  process: "Send invitation, generate token, notify user"
  backend: "POST /spaces/{id}/invite, InvitationService"
  data: "Invitation entity, User entity, relationships"
  integration: "Email service, notification system"
  analytics: "Track invitation sent/accepted events"
  test: "E2E: user receives and accepts invitation"
  docs: "Link to onboarding guide"
action_types:
  - Entity/Model Definition
  - CRUD Operations
  - API Endpoint Implementation
  - UI/UX Flow Implementation
  - Notification/Communication
  - Analytics & Event Tracking
  - Testing & Validation Automation
  - Documentation & Explainability
  - Access Control & Security
  - Error Handling & Edge Case Management
```

---

## Guidance for Human and AI Users
- **Humans:** Use action types to clarify, review, and evolve intents. Propose new types as the system grows.
- **AI Agents:** Use action types to drive code, test, and doc generation; validate traceability; and suggest improvements.
- **Both:** Treat this document as a living artifact—update it as new patterns, needs, or technologies emerge.

---

**This is a living, self-explanatory reference. Update and extend as your system and generative needs evolve.** 