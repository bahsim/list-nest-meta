🚨 **CRITICAL WARNING: ANTI-IDGL METHODOLOGY DETECTED** 🚨

> **STATUS:** This document implements **epic-based methodology** that directly contradicts canonical intent-driven principles.
> 
> **DO NOT USE** epic-based approaches for IDGL implementations. This methodology fragments comprehensive generation.
> 
> **CANONICAL AUTHORITY:** Use only [Intent Atlas Canonical Concept Foundation](./intent-atlas/concept/) for work organization approaches.
> 
> **AUDIT REFERENCE:** See [INCONSISTENCY_AUDIT_REPORT.md](./intent-atlas/INCONSISTENCY_AUDIT_REPORT.md) for methodology conflict analysis.

---

# Epic conventions

This document defines the standards and conventions for creating, naming, and maintaining epic files in this project. All contributors and automation must follow these rules.

---

## 1. Directory structure

- All epic files are stored in:
  `list-nest-docs/02-strategy/epics/`
- No subfolders for phases, areas, or status. All epic files are in this single directory.

---

## 2. File naming convention

**Pattern:**
`epic-XXX-short-description.md`

- `epic-XXX` — Three-digit epic number (e.g., `epic-001`)
- `short-description` — Concise, kebab-case summary of the epic's focus

**Examples:**
- `epic-001-core-user-identity-and-authentication.md`
- `epic-005-user-preferences-and-personalization.md`
- `epic-019-native-list-and-item-management.md`

---

## 3. File content structure

Each file must start with YAML frontmatter for metadata, followed by the epic content in markdown:

```markdown
---
id: 001
title: Core user identity and authentication
status: To Do
owner: jeffry.grilli@parqueexplora.org
description: Implement the foundational user model and secure authentication system.
phase: 1
jira-issue: [PROJ-1]
release: 1.0.0
area: Identity
stakeholders: Product, Engineering
---

# Epic 001: Core user identity and authentication

Summary of the epic and its purpose.

---

### Stakeholder impact
- ...

---

### Key features
- ...

---

### Acceptance criteria
- ...

---

### How to demo
- ...

---

### Implementation notes
- ...

---

### Dependencies
- ...

---

### Source concept files
- ...
```

---

## 4. YAML frontmatter fields

| Field        | Example value                        | Purpose                        |
|--------------|-------------------------------------|--------------------------------|
| id           | 001                                 | Unique epic number             |
| title        | Core user identity and authentication| Short, human-readable title    |
| status       | To Do                               | Workflow status                |
| owner        | jeffry.grilli@parqueexplora.org     | Responsible person             |
| description  | Implement the foundational...       | One-sentence summary           |
| phase        | 1                                   | Project phase                  |
| jira-issue   | [PROJ-1]                            | Linked issue(s)                |
| release      | 1.0.0                               | Target release                 |
| area         | Identity                            | Functional area                |
| stakeholders | Product, Engineering                | Key stakeholders               |

Optional fields: `history`, `tags`, etc.

---

## 5. Visual progress markers for roadmap and epic tracking

- Use the following emojis in the roadmap and epic tracking documents:
  - 🟦 Ready for implementation (epic is fully covered with user stories)
  - ✅ Completed (epic is fully implemented and delivered)
- Update the roadmap and any epic summary tables to reflect progress:
  - Mark an epic with 🟦 when all its user stories are written and reviewed.
  - Change to ✅ when the epic is fully implemented and accepted.
- This provides a clear, visual way to track both user story coverage and implementation progress at a glance.

---

## 6. Rationale

- Flat structure is simple, scalable, and easy to search/filter.
- Naming convention ensures clarity and easy sorting/grouping by epic number and focus.
- YAML frontmatter enables automation, filtering, and integration with project management tools.
- No subfolders avoids unnecessary complexity and makes scripting/automation easier.
- Visual progress markers make it easy to communicate and review project status.

---

## 7. Example file

Filename: `epic-001-core-user-identity-and-authentication.md`

```markdown
---
id: 001
title: Core user identity and authentication
status: To Do
owner: jeffry.grilli@parqueexplora.org
description: Implement the foundational user model and secure authentication system.
phase: 1
jira-issue: [PROJ-1]
release: 1.0.0
area: Identity
stakeholders: Product, Engineering
---

# Epic 001: Core user identity and authentication

Implement the foundational user model and establish a secure system for user registration, login, and session management.

---

### Stakeholder impact
- End users: Can register, log in, and manage their identity securely.
- Developers: Provides a reliable authentication base for all future features.
- Compliance: Lays groundwork for privacy and security requirements.

---

### Key features
- User entity
- Authentication endpoints
- Security and middleware
- Data validation

---

### Acceptance criteria
- Users can register and log in with email/password.
- Passwords are never stored in plain text.
- Authenticated users can fetch their own profile.
- Invalid credentials are rejected with a clear error.
- All endpoints are covered by integration tests.

---

### How to demo
1. Register a new user via `/auth/register`.
2. Log in with the new credentials via `/auth/login`.
3. Access `/users/me` with the returned token and verify profile data.

---

### Implementation notes
- Use bcrypt for password hashing.
- Consider rate limiting on login endpoint to prevent brute force.
- Ensure JWT secret is stored securely.

---

### Dependencies
- None. This is the root of the project.

---

### Source concept files
- [`users/user.md`](../../01-concept/users/user.md)
- [`onboarding/security.md`](../../01-concept/onboarding/security.md)
```

---

## 8. Enforcement

- All epic files must follow this convention.
- PRs that do not comply should be rejected or corrected.
- This file is the single source of truth for epic documentation standards. 