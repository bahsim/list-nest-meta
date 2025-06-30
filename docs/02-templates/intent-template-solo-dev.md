# Intent: [Feature or Epic Name]

> **Type:** Template  
> **Category:** Intent Documentation Template  
> **Status:** Complete  
> **Related:** [intent-enriched-format-principle.md](../principles/intent-enriched-format-principle.md), [ai-role-and-detailing-principle.md](../principles/ai-role-and-detailing-principle.md)

> **Note:** For each deliverable, explicitly specify which implementation layers are required (backend, frontend, tests, docs, etc.). Do not leave any layer implicit or assumed.

**Strategic Intent:**
[Write a single, clear statement of the outcome you want to achieve.]

**Rationale:**
[Explain why this outcome matters for your project or users.]

**Success Criteria:**
- [List what "done" looks like.]
- [Each item should be testable or observable.]

**Deliverables:**
- [ ] [First concrete thing to build or implement] *(Layers: Backend, Frontend, Tests, Docs, ...)*
- [ ] [Second concrete thing] *(Layers: ...)*
- [ ] [Third concrete thing] *(Layers: ...)*
- [ ] [Add as many as needed]*

---

## Implementation Layers Checklist
For each deliverable above, specify which layers are required (check all that apply):

| Deliverable                | Backend | Frontend | Tests | Docs | Other |
|----------------------------|---------|----------|-------|------|-------|
| [Deliverable 1]            | [ ]     | [ ]      | [ ]   | [ ]  | [ ]   |
| [Deliverable 2]            | [ ]     | [ ]      | [ ]   | [ ]  | [ ]   |
| [Deliverable 3]            | [ ]     | [ ]      | [ ]   | [ ]  | [ ]   |
| ...                        | [ ]     | [ ]      | [ ]   | [ ]  | [ ]   |

---

## Example: User Notification System

**Strategic Intent:**
Enable users to receive timely, relevant notifications about important events, improving engagement and responsiveness.

**Rationale:**
Notifications keep users informed and prompt action, making the app more useful and interactive.

**Success Criteria:**
- Users receive notifications for key events (e.g., new message, task due)
- Notifications are delivered in real time (in-app and email)
- Users can mark notifications as read
- All notification flows are covered by tests

**Deliverables:**
- [ ] Notification entity/model *(Layers: Backend, Tests, Docs)*
- [ ] Notification API endpoints (create, list, mark as read) *(Layers: Backend, Tests, Docs)*
- [ ] Real-time notification delivery (WebSocket or similar) *(Layers: Backend, Frontend, Tests, Docs)*
- [ ] Email notification integration *(Layers: Backend, Tests, Docs)*
- [ ] Notification UI component (in-app) *(Layers: Frontend, Tests, Docs)*
- [ ] Unit and integration tests for all flows *(Layers: Tests)*
- [ ] API and user documentation *(Layers: Docs)* 