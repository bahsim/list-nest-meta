# IDGL vs. Classic User Stories & Epics

## Summary

Classic user stories and epics are foundational to traditional software development, providing human-readable, up-front requirements that guide implementation. However, in an AI-native, intent-driven generative loop (IDGL) environment, these artifacts can become static, disconnected from real-world feedback, and suboptimal for continuous, AI-augmented development.

The IDGL approach replaces static user stories and epics with living, machine-readable **intent manifests** and **generative contracts**. These enable continuous alignment between business intent, implementation, and real-world outcomes, supporting both human and AI contributors in a closed feedback loop.

---

## Comparison Table

| Classic User Stories/Epics | IDGL Intent Manifests & Generative Contracts |
|---------------------------|----------------------------------------------|
| Human-readable, static    | Machine-readable, dynamic, versioned         |
| Written up front          | Continuously updated, feedback-driven        |
| Manual traceability       | Automated, closed-loop traceability          |
| Granularity issues        | Flexible, intent-driven granularity          |
| Human-driven change       | AI-augmented, explainable, safe change       |

---

## Rationale for Intent Manifests & Generative Contracts

- **Continuous Alignment**: Intents and contracts are updated as the system and business evolve, not just at the start of a project.
- **AI-Native**: Designed for consumption and action by AI agents, not just humans.
- **Traceable & Measurable**: Directly linked to analytics, tests, and code, enabling closed-loop validation and improvement.
- **Executable**: Can be used to generate, validate, and adapt system artifacts automatically.
- **Collaborative**: Supports both human and AI contributors, with clear, shared understanding of goals and constraints.

---

## Draft Example (to be filled in next)

### Intent Manifest Example
```yaml
intent: "Enable users to collaborate on shared lists in real time"
context: "Mobile and web users, intermittent connectivity"
constraints:
  - "Must work offline and sync when online"
success_criteria:
  - "Edits from multiple users are merged without data loss"
  - "Sync latency < 2s in 95% of cases"
links:
  - "analytics:collab-usage"
  - "test:collab-sync-e2e"
```

### Generative Contract Example
```yaml
contract:
  feature: "Real-time collaboration"
  invariants:
    - "No data loss on concurrent edits"
    - "User presence is accurate within 1s"
  test_cases:
    - "Simulate 3 users editing same item offline/online"
  metrics:
    - "collab-sync-latency"
    - "conflict-resolution-rate"
```

---

*Reflect on this approach and consider how it could be piloted or incrementally adopted in your workflow.* 

---

## Critical Reflection: Planning, Estimation, and Deadlines

While the IDGL/intents approach offers adaptability, continuous alignment, and AI-native workflows, it introduces challenges for traditional resource planning and delivery management. Conversely, classic epics and user stories, though sometimes rigid, excel at estimation, accountability, and deadline-driven execution. Below is a detailed comparison:

### Downsides of IDGL/Intents for Planning & Estimation

- **Abstractness and Granularity:**
  - Intents are high-level and flexible, making it difficult to break work into concrete, estimable tasks.
  - Sub-intents may not map 1:1 to actionable tickets or deliverables, complicating assignment and tracking.
- **Lack of Historical Velocity Data:**
  - Agile teams rely on story points, velocity, and burn-down charts derived from user stories/epics.
  - Intents and generative contracts lack standardized units of work, making forecasting timelines and resource needs harder.
- **Ambiguity in Scope:**
  - The living, evolving nature of intents means scope can change dynamically, which is risky for fixed-scope, fixed-budget projects.
  - Stakeholders may struggle to "lock in" requirements for contractual or regulatory reasons.
- **Tooling and Process Gaps:**
  - Most project management, time-tracking, and reporting tools are built around stories, tasks, and epics.
  - IDGL artifacts may not integrate cleanly with these tools, requiring custom solutions or manual mapping.
- **Accountability and Progress Tracking:**
  - User stories/epics are easily assigned, tracked, and closed, providing clear accountability.
  - Intents may blur ownership and progress, especially if multiple teams or AI agents are working on overlapping sub-intents.

### Upsides of Classic Epics/User Stories for Planning & Estimation

- **Concrete, Estimable Units:**
  - Stories are small, well-defined, and estimable—ideal for sprint planning, resource allocation, and deadline setting.
  - Teams can assign points, hours, or costs to each story, supporting granular tracking.
- **Predictable Velocity and Forecasting:**
  - Historical data on story completion enables velocity-based forecasting and burn-down/burn-up charts.
  - Managers can plan sprints, releases, and budgets with confidence.
- **Clear Scope and Change Control:**
  - Stories and epics are "locked" for a sprint or release, providing a stable baseline for delivery and contractual commitments.
  - Change requests are explicit and can be managed through backlog grooming and re-estimation.
- **Tooling and Ecosystem Support:**
  - Jira, Azure DevOps, Trello, etc. are built around stories, tasks, and epics, with rich reporting, dashboards, and integrations.
  - Time-tracking, cost allocation, and reporting are straightforward.
- **Accountability and Progress Visibility:**
  - Stories are assigned to individuals or teams, with clear "done" criteria.
  - Progress is visible and auditable at every level (story, epic, release).

### Summary Table

| Aspect                | Classic Epics/User Stories         | IDGL/Intents & Contracts         |
|-----------------------|------------------------------------|----------------------------------|
| Estimation            | Easy, granular, historical data    | Harder, abstract, less granular  |
| Velocity/Forecasting  | Strong, data-driven                | Weak, needs custom metrics       |
| Scope Control         | Stable, explicit, "locked"         | Dynamic, evolving, less fixed    |
| Tooling               | Mature, integrated                 | Emerging, custom, less support   |
| Accountability        | Clear, assignable, auditable       | Blurred, collaborative, fluid    |
| Adaptability          | Lower, but predictable             | High, but less predictable       |

### Critical Reflection

- IDGL/intents are powerful for adaptability, continuous improvement, and AI-driven development, but they introduce challenges for traditional planning, estimation, and accountability.
- Classic epics/user stories excel at resource planning, deadline management, and progress tracking, but can become rigid, stale, and disconnected from real-world feedback.

**A hybrid approach may be optimal:**
- Use intents and generative contracts for high-level direction, adaptability, and AI-native workflows.
- Decompose intents into stories/tasks for planning, estimation, and delivery, mapping them to sprints, budgets, and deadlines as needed.
- Use automation to keep both artifacts in sync (e.g., generate stories from intents, update intents as stories are completed). 