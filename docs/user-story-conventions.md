# User story conventions

This document defines the standards and conventions for creating, naming, and maintaining user story files in this project. All contributors and automation must follow these rules.

---

## Summary of Approach (Modern, Standards-Driven)

- All standards, formats, and expectations for user stories are documented in this file.
- Contributors and automation must default to these conventions for all user story generation and editing.
- Repetitive, "old school" clarifying questions (about domain, stack, audience, format, etc.) are to be avoided.
- Only ask for clarification if something is ambiguous, not covered by the conventions, or if there is a new domain/requirement not yet documented.
- This ensures a seamless, automated, and consistent process for user story creation and maintenance.

---

## 1. Directory structure

- User stories are organized into subfolders by epic:
  `list-nest-docs/03-development/03-user-stories/epic-XXX/`
- Each epic has its own folder (e.g., `epic-001`, `epic-002`, ...).
- All user stories for an epic are placed in its corresponding subfolder.

---

## 2. File naming convention

**Pattern:**
`epic-XXX-YY-short-description.md`

- `epic-XXX` — Three-digit epic number (e.g., `epic-001`)
- `YY` — Two-digit user story sequence within the epic (e.g., `01`, `02`)
- `short-description` — Concise, kebab-case summary of the story's intent

**Examples:**
- `epic-001/epic-001-01-user-signup.md`
- `epic-001/epic-001-02-user-login.md`
- `epic-005/epic-005-01-set-language-preference.md`
- `epic-019/epic-019-03-add-item-to-list.md`

---

## 3. File content structure

Each file must start with YAML frontmatter for metadata, followed by the user story in markdown:

```markdown
---
id: epic-001-01
epic: 001
title: User signup
status: To Do
priority: High
owner: jeffry.grilli@parqueexplora.org
created: 2024-06-11
---

## As a new user, I want to sign up with email and password, so that I can create an account.

### Acceptance criteria
- [ ] User can enter email and password
- [ ] Validation errors are shown for invalid input
- [ ] Account is created and user is logged in

### Notes
- See [epic-001-core-user-identity-and-authentication.md](../../02-strategy/epics/epic-001-core-user-identity-and-authentication.md)
```

---

## 4. YAML frontmatter fields

| Field     | Example value                        | Purpose                        |
|-----------|-------------------------------------|--------------------------------|
| id        | epic-001-01                         | Unique identifier              |
| epic      | 001                                 | Parent epic                    |
| title     | User signup                         | Short title                    |
| status    | To Do                               | Workflow status                |
| priority  | High                                | Priority                       |
| owner     | jeffry.grilli@parqueexplora.org     | Responsible person             |
| created   | 2024-06-11                          | Creation date                  |

Optional fields: `jira-issue`, `tags`, etc.

---

## 5. Rationale

- Per-epic subfolders keep user stories organized, scalable, and easy to review or regenerate by epic.
- Naming convention ensures clarity and easy sorting/grouping by epic and sequence.
- YAML frontmatter enables automation, filtering, and integration with project management tools.
- This structure supports large backlogs and robust automation, and makes cleanup or review by epic simple.

---

## 6. Example file

Filename: `epic-001/epic-001-01-user-signup.md`

```markdown
---
id: epic-001-01
epic: 001
title: User signup
status: To Do
priority: High
owner: jeffry.grilli@parqueexplora.org
created: 2024-06-11
---

## As a new user, I want to sign up with email and password, so that I can create an account.

### Acceptance criteria
- [ ] User can enter email and password
- [ ] Validation errors are shown for invalid input
- [ ] Account is created and user is logged in

### Notes
- See [epic-001-core-user-identity-and-authentication.md](../../02-strategy/epics/epic-001-core-user-identity-and-authentication.md)
```

---

## 7. Enforcement

- All user story files must follow this convention.
- PRs that do not comply should be rejected or corrected.
- This file is the single source of truth for user story documentation standards. 