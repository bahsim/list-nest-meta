# Unified Action Granular Backend Plan (AI-Generated, 3x Detail)

## scaffold_project
_Scaffold a new NestJS project with a clean, modular structure._
- **Step 1:** Run `npx @nestjs/cli new <project-name> --strict`.
  - **Input:** Project name, strict mode flag.
  - **Output:** Project root with `src/`, `test/`, config files.
  - **Acceptance:** Project builds and runs `npm run start:dev`.
- **Step 2:** Create standard folders: `src/entities/`, `src/modules/`, `src/common/`, `test/`.
  - **Output:** Folder structure matches architecture guidelines.

## configure_typescript
_Configure TypeScript for strict type safety and maintainability._
- **Step 1:** Edit `tsconfig.json` to set `strict: true`, add `baseUrl`, and path aliases for `@entities`, `@modules`, etc.
  - **Input:** Path alias map.
  - **Output:** Updated `tsconfig.json`.
  - **Acceptance:** TypeScript compiles with no errors; imports resolve via aliases.

## setup_linting
_Set up linting and formatting to enforce code quality._
- **Step 1:** Generate `.eslintrc.js` with NestJS, TypeScript, and Prettier plugins.
- **Step 2:** Generate `.prettierrc` with project formatting rules.
- **Step 3:** Add lint and format scripts to `package.json`.
  - **Acceptance:** `npm run lint` and `npm run format` succeed; codebase is auto-formatted.

## initialize_git
_Initialize version control and ignore unnecessary files._
- **Step 1:** Run `git init` in project root.
- **Step 2:** Generate `.gitignore` with rules for `node_modules`, `dist`, `.env*`, `coverage`, etc.
  - **Acceptance:** Untracked files are ignored as expected.

## manage_env_config
_Manage environment variables and configuration validation._
- **Step 1:** Create `.env` and `.env.example` with all required variables (e.g., `DATABASE_URL`, `JWT_SECRET`).
- **Step 2:** Scaffold `src/config/config.module.ts` using `@nestjs/config` and `joi` for schema validation.
- **Step 3:** Generate `docs/env.md` listing all variables, types, and defaults.
  - **Acceptance:** App fails to start if required env vars are missing or invalid.

## setup_database
_Set up ORM, database schema, and migration tooling._
- **Step 1:** Install ORM (e.g., Prisma: `npm install @prisma/client prisma`).
- **Step 2:** Generate `prisma/schema.prisma` or equivalent config.
- **Step 3:** Scaffold initial entities/models (e.g., `User`, `List`, `Item`) in `src/entities/`.
- **Step 4:** Generate migration scripts (`npx prisma migrate dev`).
- **Step 5:** Create `prisma/seed.ts` for test data.
- **Step 6:** Add `test/db-connection.spec.ts` to verify DB connection and migration.
  - **Acceptance:** Migrations run without error; test data is seeded; DB connection test passes.

## generate_auth_module
_Implement authentication with secure user management._
- **Step 1:** Scaffold `src/auth/auth.module.ts`, `auth.service.ts`, `auth.controller.ts`.
- **Step 2:** Create `User` entity/model in `src/entities/user.entity.ts`.
- **Step 3:** Implement registration, login, and password reset endpoints in `auth.controller.ts`.
- **Step 4:** Add DTOs with validation in `src/auth/dto/`.
- **Step 5:** Implement password hashing (bcrypt) and JWT logic in `auth.service.ts`.
- **Step 6:** Add guards for protected routes in `src/auth/guards/`.
- **Step 7:** Write unit tests for registration, login, and guards in `test/auth/`.
  - **Acceptance:** All endpoints work, validation errors handled, tests pass.

## implement_rbac
_Enforce role-based access control for all sensitive actions._
- **Step 1:** Create `roles.enum.ts` and `permissions.enum.ts` in `src/auth/`.
- **Step 2:** Scaffold RBAC guards (`roles.guard.ts`) and decorators (`roles.decorator.ts`).
- **Step 3:** Add RBAC checks to all protected controllers/services.
- **Step 4:** Add admin/owner/role seeding to `prisma/seed.ts`.
- **Step 5:** Write tests for RBAC enforcement in `test/rbac/`.
  - **Acceptance:** Only users with correct roles/permissions can access protected endpoints.

## scaffold_crud
_Scaffold CRUD modules for each main entity with validation and docs._
- **Step 1:** For each entity, generate `src/{entity}/{entity}.module.ts`, `{entity}.controller.ts`, `{entity}.service.ts`.
- **Step 2:** Create DTOs with class-validator decorators in `src/{entity}/dto/`.
- **Step 3:** Add OpenAPI decorators to all endpoints in controllers.
- **Step 4:** Write unit tests for CRUD logic in `test/{entity}/`.
  - **Acceptance:** All CRUD endpoints work, validation and docs are present, tests pass.

## write_tests
_Ensure all business logic is covered by unit and e2e tests._
- **Step 1:** Write unit tests for all services, controllers, and guards in `test/`.
- **Step 2:** Write e2e tests for all API endpoints in `test/e2e/` using Jest and Supertest.
- **Step 3:** Configure Jest to generate coverage reports.
  - **Acceptance:** All tests pass, coverage meets threshold, CI integration works.

## add_i18n
_Add internationalization support for user-facing content._
- **Step 1:** Install and configure `nestjs-i18n` in `src/i18n/`.
- **Step 2:** Generate `en.json`, `es.json`, etc. in `src/i18n/locales/`.
- **Step 3:** Refactor user-facing strings to use i18n keys in controllers/services.
- **Step 4:** Implement language switcher and locale detection middleware/service.
- **Step 5:** Write tests for i18n logic in `test/i18n/`.
  - **Acceptance:** API returns localized responses; tests pass for multiple locales.

## setup_notifications
_Implement notification system for key events and user preferences._
- **Step 1:** Scaffold `src/notifications/notification.module.ts`, `notification.service.ts`, `notification.entity.ts`.
- **Step 2:** Integrate with email/SMS/push providers (mocked for dev).
- **Step 3:** Add event triggers for key actions (e.g., new item, password reset).
- **Step 4:** Implement notification preferences and opt-in/out logic in user settings.
- **Step 5:** Write tests for notification delivery and preferences in `test/notifications/`.
  - **Acceptance:** Notifications are sent for key events, user preferences respected, tests pass.

## enforce_validation
_Enforce input validation for all API endpoints._
- **Step 1:** Add class-validator decorators to all DTOs in `src/**/dto/`.
- **Step 2:** Write tests for validation errors and edge cases in `test/validation/`.
  - **Acceptance:** Invalid input is rejected with clear error messages; tests pass.

## setup_error_handling
_Standardize error handling and response format._
- **Step 1:** Implement a global exception filter in `src/common/filters/`.
- **Step 2:** Define a standardized error response schema in shared types/docs.
- **Step 3:** Write tests for error handling in `test/errors/`.
  - **Acceptance:** All errors are handled consistently; error schema matches docs; tests pass.

## add_audit_logging
_Track all critical data changes for compliance and debugging._
- **Step 1:** Generate `AuditLog` entity in `src/audit-logs/audit-log.entity.ts` with fields: id, action, entity, entityId, userId, timestamp, changes.
- **Step 2:** Implement audit log service in `src/audit-logs/audit-logs.service.ts` to record logs on create/update/delete for all major entities.
- **Step 3:** Add hooks in entity services to call audit log service.
- **Step 4:** Integrate audit logging with RBAC (record user/role) and notifications (trigger alerts on sensitive actions).
- **Step 5:** Write tests to verify audit entries are created for each action in `test/audit-logs/`.
  - **Acceptance:** All critical actions are logged; audit log entries are queryable; tests pass.

## add_health_checks
_Expose health and readiness endpoints for monitoring._
- **Step 1:** Scaffold `src/health/health.module.ts`, `health.controller.ts` using `@nestjs/terminus`.
- **Step 2:** Add health indicators for DB, cache, and external services.
- **Step 3:** Write tests for health endpoints in `test/health/`.
  - **Acceptance:** `/health` endpoint returns status for all dependencies; tests pass.

## configure_monitoring
_Integrate with monitoring and alerting tools._
- **Step 1:** Add Prometheus/Grafana integration (mocked for dev) in `src/monitoring/`.
- **Step 2:** Document monitoring setup in `docs/monitoring.md`.
  - **Acceptance:** Metrics are exposed; docs are clear.

## implement_batch_jobs
_Implement batch processing for scheduled and background tasks._
- **Step 1:** Scaffold `src/batch/batch.module.ts`, `batch.service.ts` using `@nestjs/schedule` or Bull.
- **Step 2:** Generate handlers for notifications, analytics, and cleanup jobs.
- **Step 3:** Add scheduling and error handling logic.
- **Step 4:** Write tests for batch job execution and error cases in `test/batch/`.
  - **Acceptance:** Batch jobs run on schedule, handle errors, and are testable.

## implement_soft_delete
_Implement soft deletion and data retention policies._
- **Step 1:** Add `deletedAt` field to all major entities in `src/entities/`.
- **Step 2:** Update services to filter out soft-deleted records by default.
- **Step 3:** Implement recovery and permanent deletion logic.
- **Step 4:** Write tests for soft delete and recovery in `test/soft-delete/`.
  - **Acceptance:** Soft-deleted records are excluded from queries; recovery works; tests pass.

## add_test_coverage
_Track and enforce test coverage targets._
- **Step 1:** Configure Jest to generate coverage reports and fail CI if below threshold.
- **Step 2:** Add badge/report to project README.
  - **Acceptance:** Coverage is tracked and enforced in CI.

## generate_api_docs
_Generate and maintain API documentation._
- **Step 1:** Scaffold Swagger/OpenAPI config in `src/swagger/` and expose `/docs` endpoint.
- **Step 2:** Add controller and DTO annotations for all endpoints.
- **Step 3:** Provide static API documentation and versioning logic (e.g., `docs/api/v1/`).
  - **Acceptance:** API docs are complete, versioned, and accessible.

## manage_docs_versioning
_Manage versioning for API and developer documentation._
- **Step 1:** Generate scripts to version static API docs and changelogs in `docs/api/`.
- **Step 2:** Document versioning process in `docs/versioning.md`.
  - **Acceptance:** Docs are versioned and process is documented.

## setup_ci_cd
_Set up Docker and CI/CD pipelines for build, test, and deploy._
- **Step 1:** Generate `Dockerfile` and `docker-compose.yml` for local/dev/prod in project root.
- **Step 2:** Scaffold CI pipeline config (e.g., `.github/workflows/ci.yml`) for lint, test, build, and deploy.
  - **Acceptance:** CI/CD runs on push/PR, builds, tests, and deploys successfully.

## manage_secrets
_Automate secure environment setup and secrets management._
- **Step 1:** Generate scripts/config for managing secrets (e.g., Vault, dotenv, GitHub Secrets).
- **Step 2:** Document secrets management process in `docs/secrets.md`.
  - **Acceptance:** Secrets are managed securely and process is documented. 