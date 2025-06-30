🚨 **CRITICAL WARNING: FRAMEWORK CONFLICT IDENTIFIED** 🚨

> **STATUS:** This document contains an **alternative IDGL framework** that contradicts the canonical concept foundation.
> 
> **DO NOT USE** this document for IDGL implementations until systematic reconstruction is complete.
> 
> **CANONICAL AUTHORITY:** Use only [Intent Atlas Canonical Concept Foundation](./intent-atlas/concept/) for all IDGL implementations.
> 
> **AUDIT REFERENCE:** See [INCONSISTENCY_AUDIT_REPORT.md](./intent-atlas/INCONSISTENCY_AUDIT_REPORT.md) for full conflict analysis.

---

# IDGL Rationale

---

## How This Fits

This document is part of the `/00-meta` standards and rationale system. It provides the reasoning and justification for adopting the IDGL approach. For operational rules and rituals, see [session-checklist.md](./session-checklist.md), [ai-participation-rules.md](./ai-participation-rules.md), and [PROJECT-STATUS.md](./PROJECT-STATUS.md).

---

## References
- [session-checklist.md](./session-checklist.md)
- [ai-participation-rules.md](./ai-participation-rules.md)
- [PROJECT-STATUS.md](./PROJECT-STATUS.md)
- [intent-driven-generative-lifecycle.md](./intent-driven-generative-lifecycle.md)
- [idgl-ai-reflection.md](./idgl-ai-reflection.md)

---

# Rationale and Commentary for the Intent-Driven Generative Lifecycle (IDGL)

## Introduction

This document captures the "why" behind the `intent-driven-generative-lifecycle.md`. The final IDGL is the product of an intense, collaborative, and iterative discussion. This commentary explains the key arguments, pivots, and conclusions that led to its creation, ensuring the strategic reasoning behind our process is never lost.

## 1. The Flaw of Retrofitting: Why Old Models Failed

Our initial exploration began by attempting to adapt traditional, human-centric software development lifecycles for an AI partner. We considered and prototyped several models:

*   **Test-Driven AI Development (TDAD):** The developer writes a failing test, and the AI makes it pass.
*   **Specification and Acceptance Driven Development (SADD):** The developer writes a user-behavior file, and the AI builds the feature and the corresponding E2E tests.
*   **Continuous AI Co-creation (CAIC):** A Kanban-style approach where the developer manages a backlog of small tasks for the AI to pull from.

**Conclusion:** All these models were fundamentally flawed for the same reason: they treated the AI as a "pair programmer" or a "junior developer." They forced a powerful, holistic intelligence into a narrow, task-oriented box. This was merely retrofitting an AI into a human process, not inventing a new, more powerful one. It failed to leverage the AI's core strengths.

## 2. The First Breakthrough: The Intent-Driven Model

The first true breakthrough came when we abandoned the old models and designed a process around the AI's unique capabilities. This led to the initial **Intent-Driven Generative Lifecycle (IDGL)** concept.

**Key Principles:**
*   **The Developer as Director:** Elevate the human role from writing code or tests to providing high-level strategic direction.
*   **The AI as Weaver:** Empower the AI to act as a system architect, analyzing an "Intent" and generating a complete, holistic solution (code, tests, schema, etc.) in a single operation.
*   **Review the Proposal, Not Just the Code:** The Director's primary point of leverage is reviewing the AI's comprehensive "Change Proposal" *before* implementation, allowing for high-level course correction without wasting effort on flawed code.

This was a massive leap forward, but it was still incomplete.

## 3. The Second Breakthrough: The Strategic Imperative

We quickly identified a critical flaw in the initial IDGL: it assumed the "Intent" would magically appear. It placed the burden of analyzing the entire conceptual vision and the entire (potential) codebase on the human Director to formulate the *next right thing* to do.

This was, again, asking a human to do what an AI is best suited for: massive-scale information processing and strategic planning.

This led to our most important conclusion: **The AI must be a Strategic Planner, not just a Code Weaver.**

This insight forced us to address two realities:
1.  **The "Greenfield" Problem:** A strategic process must work from the ground up, even when no codebase exists for comparison.
2.  **The Need for a Dedicated Strategy Phase:** This planning work is distinct from both high-level conceptualization and low-level implementation.

## 4. The Final Synthesis: Our Three-Stage Lifecycle

The final, robust `IDGL` is a synthesis of all these learnings. It creates a clear, three-stage process that leverages the unique strengths of both the Director and the AI.

*   **Stage 1: Conceptualization (Architect)**
    *   **Human Strength:** Creativity, business acumen, domain knowledge. The human defines the soul of the project—the "why."

*   **Stage 2: Strategic Roadmapping (Planner)**
    *   **AI Strength:** Massive-scale information processing and dependency analysis. The AI reads the entire concept and generates a technically sequenced `proposed-roadmap.md`.
    *   **Human Strength:** Strategic prioritization. The Director reviews the AI's technical plan and applies business goals, market knowledge, and MVP scoping to create the `prioritized-roadmap.md`.

*   **Stage 3: Implementation (Weaver)**
    *   **Human Strength:** Focused decision-making. The Director selects the next epic from the prioritized roadmap and provides the "go" signal. They are the final arbiter of quality.
    *   **AI Strength:** Flawless, holistic, multi-file code generation. The AI takes the approved intent and implements it perfectly across the entire stack.

This final model creates a powerful synergy. The AI does the heavy lifting of planning and execution, freeing the human to focus entirely on the high-leverage strategic decisions that a machine cannot. This is the foundation of our collaboration. 