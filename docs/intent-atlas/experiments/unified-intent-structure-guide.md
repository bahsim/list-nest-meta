# Unified Intent Structure Guide: AI-Native, Modular, and Self-Explanatory

## Introduction: Why a Structure Guide?

A clear, actionable structure is essential for making unified intent generative, explainable, and maintainable. This guide provides a canonical, narrative-driven template for organizing unified intent artifacts in a modular, domain-oriented way. It is designed for both newcomers and experienced practitioners, as well as for AI agents that generate, validate, and evolve the system.

## Philosophy & Purpose
- **Modular by Domain:** Organize unified intent as a directory with one file per major system domain (not technical layer), plus a root index file for aggregation and cross-domain links.
- **Vertically Sliced Intents:** Each intent should describe the full vertical slice (user, UI/UX, process, backend, data, integration, analytics, test, docs).
- **Traceability & Living Documentation:** Every artifact (code, test, doc) should be traceable to its intent. The structure should support continuous evolution and feedback.

## Anatomy of a Unified Intent YAML File

A unified intent YAML file is a modular, domain-oriented artifact that captures all actionable requirements, flows, and constraints for a major system domain (such as user management, notifications, or integrations). Each file contains a list of intents, where each intent is a vertically sliced, generative unit of work. The structure is designed to be both human-readable and AI-actionable, supporting traceability, automation, and continuous evolution.

### Key Sections of an Intent
- **id:** A unique identifier for the intent within the domain.
- **description:** A concise summary of the intent's purpose and outcome.
- **vertical_slice:** A nested object describing the full stack of the requirement, including:
  - user_story: The user-facing motivation or goal.
  - ui_ux: UI/UX requirements or flows (if applicable).
  - process: The business or system process to be implemented.
  - backend: Backend logic, endpoints, or services.
  - data: Data models, entities, or storage needs.
  - integration: External or internal integrations required.
  - analytics: Events or metrics to track.
  - test: Testing requirements (unit, integration, E2E).
  - docs: Documentation or explainability needs.
- **action_types:** A list of canonical action types (see action types reference) that clarify what generative work is required.
- **dependencies:** Other intents or modules this intent depends on.
- **status:** The current state (planned, todo, in progress, done, etc.).
- **ai_integration:** (See below) Explicit, actionable guidance for AI and human contributors on how to implement, automate, or review the intent.

This structure ensures that every intent is vertically sliced, generative, and traceable, supporting both manual and automated workflows. The file as a whole is modular by domain, and should be referenced in a root index for cross-domain navigation and aggregation.

## The ai_integration Field: AI-Native Guidance

The `ai_integration` field is a core, generative component of each unified intent. It provides explicit, actionable guidance for both AI agents and human contributors on how to implement, automate, or review the intent. This field is essential for making the requirements system "AI-native" and generative, meaning it is designed to be directly actionable by both humans and AI tools (such as code generators, documentation bots, or review assistants).

### Purpose and Value
- **AI-Native Guidance:** Offers clear instructions and best practices for how an AI (or a developer using AI tools) should approach the implementation, testing, automation, and documentation of the intent. This includes which frameworks, patterns, and validation steps to use, as well as suggestions for modularity, maintainability, and extensibility.
- **Automation Enablement:** Structured so that AI tools can parse it and generate code, tests, documentation, or review checklists automatically. This accelerates development and reduces ambiguity, making the system more maintainable and scalable.
- **Consistency & Quality:** Standardizes the approach to each intent, helping ensure that all implementations follow best practices, are well-tested, and are easy to review and extend. Reduces the risk of missed requirements or inconsistent implementations.
- **Onboarding & Knowledge Transfer:** New contributors (human or AI) can quickly understand not just what needs to be built, but how to build it in a way that aligns with the project's architecture, coding standards, and domain-specific requirements.
- **Traceability & Review:** Can be used as a checklist during code review or automated validation, ensuring that all critical aspects (security, error handling, documentation, etc.) are addressed.

### Structure and Best Practices
- The field should be written as a narrative, checklist, or set of bullet points, tailored to the domain and action type.
- It should be explicit about:
  - What code, tests, or docs should be generated
  - What patterns, frameworks, or best practices to follow
  - What to review for (modularity, maintainability, security, etc.)
  - How to handle edge cases, error handling, and extensibility
- The guidance should be actionable for both humans and AI tools, and updated as the system evolves.

### Example
For an intent like "user registration":
```yaml
ai_integration: |
  # AI Guidance
  - Generate registration endpoint logic, validation, and password security using NestJS best practices.
  - Automate test generation for valid, duplicate, weak/invalid, and abuse scenarios.
  - Propose improvements for rate limiting, error handling, and user experience.
  - Review for modularity, maintainability, and security.
  - Suggest documentation and real-world registration scenarios.
```

### In Summary
The `ai_integration` field is a bridge between high-level requirements and practical, automated implementation. It makes the intent system not just a static document, but a living, generative artifact that can drive and accelerate development, review, and automation—enabling both humans and AI to work more effectively together.

## Real-World Example (Vertical Slice)

```yaml
# In /unified-intent/user-management.yaml
user_management:
  - id: invite_user_to_space
    description: Allow a user to invite another user to a space via email
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
    dependencies: [create_space, user_registration]
    status: planned
```