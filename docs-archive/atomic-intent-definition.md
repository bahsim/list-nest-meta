# Atomic Intent: Definition and Role in Unified Intent System

## What is an Atomic Intent?

An **atomic intent** is the smallest, indivisible, and testable requirement that describes a single, clear outcome or behavior expected from the system. In the ListNest unified intent system, atomic intents are derived from high-level intents by decomposing broad goals or features into granular, actionable requirements that can be individually implemented, tested, and verified.

---

## Purpose and Value

- **Clarity:** Atomic intents eliminate ambiguity by specifying exactly what the system must do in a given scenario.
- **Testability:** Each atomic intent is written so it can be directly validated through automated or manual tests.
- **Traceability:** Atomic intents are linked to their parent high-level intents, ensuring every requirement is accounted for and changes can be tracked.
- **Parallelization:** By breaking down complex features into atomic units, teams can work on, review, and test requirements independently and in parallel.
- **Auditability:** Atomic intents provide a clear, auditable record of what the system is supposed to do, supporting compliance and quality assurance.

---

## Key Characteristics

- **Granularity:** Describes a single, specific outcome or behavior.
- **Testable:** Includes clear acceptance criteria and, where possible, example test cases.
- **Traceable:** References its parent high-level intent and source documentation.
- **Unambiguous:** Written in precise, actionable language.
- **Reviewable:** Marked as AI-generated and/or reviewed for human validation.

---

## Relationship to High-Level Intents

High-level intents describe broad goals, features, or user stories (e.g., "Enable user authentication"). Atomic intents are derived from these by decomposing them into the smallest possible requirements (e.g., "User can log in with valid credentials"). Each atomic intent references its parent, ensuring a clear lineage from strategic goals to implementation details.

---

## Practical Example

**High-Level Intent:**
- *"Enable user authentication for the application."*

**Atomic Intents:**
- User can successfully log in with valid credentials.
- User receives an error when providing an incorrect password.
- User can log out from any device.
- User session expires after a period of inactivity.

Each atomic intent is written as a YAML entry with fields for description, acceptance criteria, test case examples, traceability, and review status.

---

## Reference YAML Structure

```yaml
atomic_intents:
  - id: user-login-success
    parent_intent_id: user-authentication
    description: User can successfully log in with valid credentials.
    acceptance_criteria:
      - User provides valid email and password.
      - System authenticates and returns a session token.
      - User is redirected to the dashboard.
    test_case_example: |
      Given a registered user,
      When they submit correct credentials,
      Then they receive a valid session and access the dashboard.
    source_high_level_file: user-auth.yaml
    ai_generated: true
    reviewed: false
```

---

Atomic intents are the foundation for precise, testable, and maintainable requirements in the ListNest unified intent system. 