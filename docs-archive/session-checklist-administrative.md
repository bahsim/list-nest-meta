🚨 **CRITICAL WARNING: ADMINISTRATIVE OVERHEAD CONTRADICTS IDGL** 🚨

> **STATUS:** This checklist emphasizes **administrative process tracking** that contradicts canonical outcome-focused cycle principles.
> 
> **DO NOT USE** administrative session rituals for IDGL implementations. This creates process overhead vs. strategic outcomes.
> 
> **CANONICAL AUTHORITY:** Use only [Intent Atlas Canonical Concept Foundation](./intent-atlas/concept/) for cycle management approaches.
> 
> **AUDIT REFERENCE:** See [INCONSISTENCY_AUDIT_REPORT.md](./intent-atlas/INCONSISTENCY_AUDIT_REPORT.md) for process contradiction analysis.

---

# Session Start/End Checklist

> **Location:** `/00-meta/session-checklist.md`
> **References:** See also [`PROJECT-STATUS.md`](./PROJECT-STATUS.md), [`assistant-session-rules.md`](./assistant-session-rules.md), [`epic-conventions.md`](./epic-conventions.md), [`user-story-conventions.md`](./user-story-conventions.md)

---

## Purpose

This checklist ensures that every session—whether new, resumed, human, or AI—begins and ends with full clarity, context, and traceability. It enforces consistent progress tracking, status marking, and documentation, preventing ambiguity or drift across all project artifacts.

---

## Session Start Checklist

1. **Review Project Status**
   - Read the latest `PROJECT-STATUS.md` to understand the current phase, last completed action, blockers, and next step.
2. **Review Conventions**
   - Skim relevant conventions in `/00-meta/` (epic, user story, assistant session rules) to ensure compliance.
3. **Check Progress File**
   - Open the current progress file (e.g., `user-story-generation-progress.json` or equivalent).
   - Confirm what was last completed, what is in progress, and what is next.
4. **Summarize Session Context**
   - Write or state a brief summary: "Last completed: X. In progress: Y. Next step: Z."
5. **Identify Ambiguities**
   - Note any unclear or conflicting information and resolve before proceeding.

---

## Session End Checklist

1. **Mark Completions**
   - Update the `status` field in YAML frontmatter for any completed epic or user story files.
   - Update visual progress markers (🟦, ✅) in roadmaps or summary tables as appropriate.
2. **Update Progress File**
   - Record all completed steps, new in-progress items, and any blockers in the progress file.
3. **Synchronize Status**
   - Ensure all status markers (YAML, progress file, roadmap) are consistent and up to date.
4. **Leave a Session Log**
   - Add a brief session log entry to the progress file or `PROJECT-STATUS.md`:
     - Who/what worked
     - What was accomplished
     - Any issues or notes for the next session
5. **Prepare for Next Session**
   - Clearly state the next actionable step or decision required.

---

## Rationale

- This ritual ensures that every session starts with full context and ends with a clear, documented handoff—eliminating ambiguity, duplicated work, or lost progress.
- It enforces the "single source of truth" principle for status and progress, and supports seamless human-AI collaboration.
- By making the ritual explicit, any new or resuming contributor can follow it without prior context.

---

**All contributors (human and AI) must follow this checklist at every session boundary.** 