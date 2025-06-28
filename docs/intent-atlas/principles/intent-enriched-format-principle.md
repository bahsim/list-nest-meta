# Enriched Intent Format Principle

## What Is the Enriched Intent Format?
The enriched intent format is a detailed, structured approach to documenting your feature or epic intent. It combines a clear outcome statement (intent) with a granular, actionable breakdown of deliverables—often organized as checklists or sub-tasks for each major item.

## Why Use the Enriched Format?
- **Prevents Reinventing the Wheel:** Every step, edge case, and validation is captured up front, so you (and your AI) never have to guess or re-invent the process.
- **Maximizes AI Assistance:** The more detail you provide, the more reliably your AI assistant can generate, validate, and automate code, tests, and docs.
- **Consistency and Reuse:** Detailed checklists can be reused or adapted for similar features, saving time and ensuring best practices.
- **Reduces Cognitive Load:** You don't have to remember every step or edge case—the file is your external brain.
- **Onboarding and Handover:** If you ever add a collaborator or return after a break, the enriched file is easy to pick up and continue.
- **Accelerates Delivery:** With all requirements and steps explicit, you move faster and make fewer mistakes.

## Structure of the Enriched Intent Format
- **Strategic Intent:** One clear statement of the outcome/value.
- **Rationale:** Why this matters for your project or users.
- **Success Criteria:** What "done" looks like (testable, observable).
- **Enriched Deliverables:**
  - Each deliverable is actionable and broken down into sub-tasks or checklists as needed.
  - Edge cases, validations, and integration points are included.
  - No ambiguity—every step is explicit.

---

## Example: Enriched Intent for User Registration

**Strategic Intent:**
Allow new users to securely register with email and password, ensuring robust validation, password security, and protection against abuse.

**Rationale:**
Secure registration is the foundation for user trust and platform integrity.

**Success Criteria:**
- User can register with email and password.
- Password is hashed and never stored in plain text.
- Duplicate emails and weak passwords are rejected with clear errors.
- Registration is rate-limited and logged.
- All scenarios are covered by integration tests.

**Enriched Deliverables:**
- [ ] Registration API endpoint (`/auth/register`)
    - [ ] Validate email format
    - [ ] Validate password strength (min length, complexity)
    - [ ] Check for duplicate email
    - [ ] Hash password with bcrypt
    - [ ] Store user in database
    - [ ] Return confirmation or session token
    - [ ] Handle and log registration errors
    - [ ] Enforce rate limiting (e.g., 5 attempts/minute per IP)
    - [ ] Cover all scenarios with integration tests
- [ ] User entity/model with profile data
- [ ] Error handling for invalid input, duplicate emails, and weak passwords
- [ ] Logging of registration attempts
- [ ] Documentation for registration flow and API

---

**Use this enriched format as your standard for all future intents to maximize clarity, speed, and AI-powered productivity.** 