# Unified Intent Experimentation: AI-Native, Modular, and Living

## Introduction: Why Experiment with Unified Intent?

Unified intent is not just a static requirements artifact—it is a living experiment in how to make software creation generative, explainable, and system-oriented. This document captures the philosophy, practical steps, and lessons learned from evolving unified intent in an AI-native workflow. It is designed to help both newcomers and experienced practitioners understand how to implement, adapt, and improve unified intent in real projects.

## Philosophy & Purpose
- **Modular by Domain:** As actionable detail and system complexity grow, a single monolithic file becomes unwieldy. Modularize unified intent by major system domain (not technical layer), with one file per domain and a root index file for aggregation and cross-domain links.
- **Generative Lifecycle:** Unified intent is the substrate for the closed-loop between prompt engineer and AI agent. Define, decompose, generate, validate, assemble, and trace—all from the same living artifact.
- **Continuous Experimentation:** Treat unified intent as a living experiment. Update with findings, blockers, and refinements as the approach is tested in practice.

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

## Guidance for Human and AI Users
- **Humans:** Use this experimentation guide to clarify, review, and evolve your unified intent process. Propose new patterns and document lessons learned.
- **AI Agents:** Use unified intent to drive code, test, and doc generation; validate traceability; and suggest improvements. Learn from experiment outcomes.
- **Both:** Treat this document as a living experiment—update it as new patterns, needs, or technologies emerge.

## Living Artifact Statement
Unified intent experimentation is always evolving. Update this guide as your system, team, and generative needs change. Document what works, what doesn't, and why.

## FAQ & Common Pitfalls
- **Q: Is modularization required?**
  - A: For large systems, yes. Modularization by domain with a root index is best practice.
- **Q: How do I know if my experiment is working?**
  - A: Look for improved traceability, generativity, and explainability. If bottlenecks or confusion arise, refine your approach.
- **Q: Can I revert to a monolithic file?**
  - A: Only for very small systems. For most, modularization is more scalable and maintainable.
- **Pitfall:** Treating experimentation as a one-time event. It must be ongoing, with regular review and adaptation.

# Experiment: Unified Intent & AI-Native IDGL Unified Work

## Introduction & Hypothesis
Fragmenting work into epics and intents is a transitional, human-centric constraint. For AI-native, generative software creation, merging all actionable requirements into a single, unified system intent enables global optimization, coherence, and systematic generation. With AI as a primary agent, we can break free from serialized SDLC constraints. The unified intent is not backend- or frontend-oriented, but system-oriented, and is the foundation for generative, explainable software creation. As actionable detail grows, modularizing unified intent by domain (with an index file) is recommended for scalability and maintainability.

## Unified Intent as Substrate
- Use a modular, unified intent artifact (one file per major domain, plus an index) as the foundation for all generation, validation, and reasoning.
- Structure each domain file as a graph of linked, testable, traceable requirements, actions, and flows.
- The unified intent is the substrate for the closed-loop between prompt engineer and AI agent in the IDGL paradigm.
- Maintain actionability by ensuring each requirement/action/flow is testable, traceable, and vertically sliced (user → UI/UX → process → backend → data → notification → analytics → test).

## Action Decomposition & Vertical Slicing
- Decompose the unified intent into atomic actions, each covering all necessary layers (UI, backend, process, etc.).
- Actions are the atomic units of work, reused and composed across the system.
- Instead of working ticket-by-ticket, generate all implementations of action a, then all of action b, etc., across the system.
- Each action is vertically sliced, covering all layers as needed.

## Generative System Assembly
- The AI agent generates, validates, and assembles all actions across the system, guided by the prompt engineer.
- Outputs are synchronized and validated against the unified intent to ensure coherence, completeness, and traceability.
- Assemble the system from generated actions, ensuring explainability and traceability.

## Division of Labor: AI Agent & Human Developer
- The AI agent excels at repetitive, well-defined, or simple actions, generating, validating, and assembling these across the system.
- The human developer focuses on complex, ambiguous, or novel tasks that require judgment, creativity, or deep domain knowledge.
- The prompt engineer curates and evolves the unified intent, guiding the AI agent.
- The AI agent and human developer operate in a closed loop, reviewing and refining outputs.

## Living Documentation & Traceability
- Auto-generate and update documentation, diagrams, and mapping tables from the unified intent and codebase.
- Ensure every artifact is linked to its intent; flag or block anything that isn't.
- Attempt to commit unlinked code/docs and verify that the system blocks or flags the action.
- The system is always visible as a whole, enabling explainability and traceability.

## Practical Steps
1. Define the unified system intent (all requirements, flows, constraints, and actions in one actionable graph).
2. Decompose into linked, testable, traceable actions (not tickets).
3. Generate and validate all actions across the system, assembling them into the full software.
4. Synchronize and validate outputs against the unified intent.
5. Auto-generate and update documentation, diagrams, and mapping tables.
6. Enforce explainability and traceability for every artifact.

## Expected Outcomes
- Less fragmentation, more global optimization and coherence.
- Systematic, generative software creation, not just development.
- All code, tests, and docs are traceable to the unified intent.
- Full, intent-aligned, AI-generated system scaffold—backend, frontend, tests, docs—ready for rapid iteration and refinement.
- No human bottlenecks, no unnecessary serialization, and no "old school" step-by-step constraints.
- Unified, generative, explainable software creation, not just parallel work.

## Notes
- This approach is optimal for AI-native workflows, and is a living experiment. Update with findings, blockers, and refinements as the approach is tested in practice. 