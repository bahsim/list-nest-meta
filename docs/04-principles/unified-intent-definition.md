# Unified Intent: Canonical Definition (AI-Native, IDGL)

> **Type:** Principle  
> **Category:** Intent Definition & Philosophy  
> **Status:** Complete  
> **Related:** [unified-intent-structure-guide.md](./unified-intent-structure-guide.md), [unified-intent-action-types.md](./unified-intent-action-types.md)

## Introduction: Why Unified Intent?

Unified intent is the heart of AI-native, intent-driven software creation. It is a single, living, system-oriented artifact that contains the sum of all actionable requirements, flows, and constraints for your entire system—across backend, frontend, UI/UX, process, automation, analytics, and documentation. Unified intent is not just a requirements doc: it is the substrate from which the system is generated, assembled, and validated, closing the loop between prompt engineer and AI agent.

## Philosophy & Purpose
- **System-Oriented:** Unified intent describes what the system must do as a whole, not just backend or frontend.
- **Single Source of Truth:** All requirements, flows, and constraints are merged into one artifact (or modular set, with a clear index).
- **Actionable & Testable:** Each intent is written to directly drive code, tests, and documentation; every requirement is traceable and verifiable.
- **Vertically Sliced:** Each action or requirement describes the full vertical slice: user → UI/UX → process → backend → data → notification → analytics → test.
- **AI-Native:** Structured for both human and AI agent consumption, enabling automated generation, validation, and synchronization.
- **Living Document:** Continuously updated as the system evolves, ensuring the system is always visible and explainable as a whole.

## Real-World Example (Vertical Slice)

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

## Guidance for Human and AI Users
- **Humans:** Use unified intent to clarify, review, and evolve requirements. Propose new patterns as the system grows.
- **AI Agents:** Use unified intent to drive code, test, and doc generation; validate traceability; and suggest improvements.
- **Both:** Treat this document as a living artifact—update it as new patterns, needs, or technologies emerge.

## Living Artifact Statement
Unified intent is always evolving. Update it as your system, team, and generative needs change. It is the authoritative, actionable, and generative blueprint for your entire system.

## FAQ & Common Pitfalls
- **Q: Is unified intent just for backend?**
  - A: No. It is system-wide: backend, frontend, UI/UX, process, analytics, docs, and more.
- **Q: Can I split unified intent into multiple files?**
  - A: Yes, as long as you maintain a clear index and cross-domain links.
- **Q: What if my intent is missing a vertical slice?**
  - A: Add it! Every intent should be vertically sliced for full traceability and generativity.
- **Pitfall:** Treating unified intent as a static doc. It must be living, actionable, and always up to date.

## Why Does Unified Intent Matter?
- **Eliminates Fragmentation:** No more scattered epics, tickets, or siloed requirements.
- **Enables Global Optimization:** The system can be reasoned about and improved as a whole.
- **Drives All Artifacts:** Code, tests, docs, and diagrams are all generated and validated from the unified intent.
- **Ensures Traceability:** Every artifact is linked to its intent, enabling explainability and compliance.
- **Supports AI-Native Workflows:** The AI agent can act on the entire system context, not just isolated parts.

## How is Unified Intent Used?
- **Foundation for Generative Software:** The unified intent is not just a requirements doc—it is the substrate from which the system is generated, assembled, and validated, closing the loop between the prompt engineer and the AI agent.
- **Continuous Evolution:** All changes, additions, and refinements are made here, ensuring the system is always up-to-date and explainable.
- **Traceable Generation:** Every code module, test, and documentation section is generated and validated against the unified intent, ensuring end-to-end traceability and coherence. 