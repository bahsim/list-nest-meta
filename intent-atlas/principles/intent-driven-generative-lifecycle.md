# Intent-Driven Generative Lifecycle (IDGL)

---

## How This Fits

This document is part of the `/00-meta` standards and rationale system. It describes the philosophy and high-level process of the IDGL, which underpins all operational rules and rituals. For actionable process, see [session-checklist.md](./session-checklist.md), [ai-participation-rules.md](./ai-participation-rules.md), and [PROJECT-STATUS.md](./PROJECT-STATUS.md).

---

## References
- [session-checklist.md](./session-checklist.md)
- [ai-participation-rules.md](./ai-participation-rules.md)
- [PROJECT-STATUS.md](./PROJECT-STATUS.md)
- [idgl-ai-reflection.md](./idgl-ai-reflection.md)
- [idgl-rationale.md](./idgl-rationale.md)

---

# The Intent-Driven Generative Lifecycle (IDGL)

This document outlines the definitive Software Development Lifecycle for this project. It is a generative process directed by a human, designed to leverage the AI's ability to reason about the entire system holistically.

## The Three-Stage Development Model

Our project recognizes three distinct stages of development, each with a specific goal and a corresponding documentation directory.

*   **Stage 1: Conceptualization (Architect Mode)**
    *   **Goal:** To define the project's vision, philosophy, domain models, and architecture. This stage answers the question, *"What are we building and why?"*
    *   **Artifacts:** The living documents within `01-concept/`.
    *   **Role:** The Developer acts as the **Architect**, shaping the grand vision.

*   **Stage 2: Strategic Roadmapping (Planner Mode)**
    *   **Goal:** To translate the grand vision into a prioritized, high-level project plan, starting from the ground up.
    *   **Artifacts:** The **Strategic Roadmap** and **Epics** within `02-strategy/`.
    *   **Role:** The AI acts as the **Planner**, with the Developer acting as the **Director** to approve and prioritize the generated plan.

*   **Stage 3: Implementation (Director & Weaver Mode)**
    *   **Goal:** To translate prioritized epics into tangible, working software.
    *   **Artifacts:** The version-controlled **Change Proposals** within `03-development/00-plans/`.
    *   **Role:** The Developer acts as the **Director**, guiding the AI **Weaver** through the implementation of each epic.

---

## Stage 2 Workflow: Strategic Roadmapping

This workflow is initiated when the conceptual foundation is stable. Its purpose is to transform the holistic vision into a concrete, prioritized action plan.

**1. Phase: Roadmap Generation & Dependency Analysis (AI as Planner)**
*   **Trigger:** The Director issues a command like, "Generate the strategic roadmap."
*   **Action:** The AI performs a **Concept Decomposition**. It reads the *entire* `01-concept` library and constructs a dependency graph of all features and entities.
*   **Output:** The AI generates a `proposed-roadmap.md` document in `list-nest-docs/02-strategy/`. This roadmap is a list of all possible **Epics**, sorted by their **technical dependencies**. It is a proposal of a logical build order, not a final business plan.

**2. Phase: Strategic Prioritization & MVP Scoping (Director)**
*   **Action:** The Director reviews the AI's technically-sequenced `proposed-roadmap.md`. Applying strategic, business, and product knowledge, the Director then creates the `prioritized-roadmap.md`. This involves:
    *   Selecting a subset of epics for the next release or MVP.
    *   Re-ordering the selected epics based on business priority, while respecting the technical dependencies identified by the AI.
    *   Annotating epics with goals or metrics.
*   **Output:** A `prioritized-roadmap.md` file. This is the official, actionable plan for the next development cycle.

> **Process Safeguard:**
> The AI Planner must always present the Director with the **full, unfiltered set of possible epics/features** derived from the entire concept corpus, with all dependencies clearly annotated. The AI must **never pre-filter, pre-prioritize, or propose implementation** of any epic or feature. Only the Director has the authority to select, scope, and prioritize work for implementation. The AI's role is to surface the complete landscape and provide all necessary context for strategic decision-making.

---

## Stage 3 Workflow: Implementation (IDGL)

This workflow begins once the `prioritized-roadmap.md` is finalized.

**1. Phase: Intent Articulation (Director)**
*   **Action:** The Director selects the highest-priority Epic from the **`prioritized-roadmap.md`**. This action is the formal start of a development sprint.
*   **Resulting Intent:** "We are now starting 'Epic: Implement User Authentication'. The intent is to build the features outlined in the `prioritized-roadmap.md`."

**2. Phase: Simulation & Proposal Generation (AI as Weaver)**
*   **Action:** The AI receives the Intent. It analyzes the Intent against its deep understanding of the relevant concept files (and the codebase, if any). It simulates the future state and generates a single, comprehensive **Change Proposal**.
*   **The Change Proposal contains:**
    1.  **Executive Summary:** A plain-language explanation of the plan.
    2.  **Architectural Impact:** Proposed changes to API contracts, database schemas, and core data structures.
    3.  **Implementation Plan:** A list of all files to be created or modified, including new tests.
    4.  **Full Code Diff:** A preview of the exact code changes for all affected files.
    5.  **Risk Analysis:** Potential side-effects or areas needing manual verification.

**3. Phase: Formal Documentation (Weaver)**
*   **Action:** The AI writes the complete Change Proposal to a new, chronologically numbered file in `list-nest-docs/03-development/00-plans/`.

**4. Phase: Strategic Review & Approval (Director)**
*   **Action:** The Director reviews the version-controlled plan document for the Change Proposal.
*   **Output:** The Director provides explicit approval to proceed.

**5. Phase: Weaving (Weaver)**
*   **Action:** Upon formal approval, the AI executes the *entire* Change Proposal.

**6. Phase: Final Verification (Director)**
*   **Action:** The Director performs a final, high-level verification of the running feature. 