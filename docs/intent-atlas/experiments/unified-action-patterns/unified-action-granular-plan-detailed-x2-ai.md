# Unified Action Granular Backend Plan (AI-Generated, Explicit & Automation-Ready)

## scaffold_project
_Scaffold a new NestJS project with a clean, modular structure._
- Generate a new NestJS project with a modular folder structure, using strict TypeScript mode and workspace conventions. Output: project root with `src/`, `test/`, and config files.

## configure_typescript
_Configure TypeScript for strict type safety and maintainability._
- Generate a `tsconfig.json` with `strict: true`, path aliases, and recommended compiler options. Output: `tsconfig.json`.

## setup_linting
_Set up linting and formatting to enforce code quality._
- Generate `.eslintrc.js` and `.prettierrc` with recommended rules for NestJS and TypeScript. Output: config files and scripts in `package.json`.

## initialize_git
_Initialize version control and ignore unnecessary files._
- Initialize a Git repository and generate a `.gitignore` that excludes node_modules, build artifacts, and environment files. Output: `.git` folder and `.gitignore`.

## manage_env_config
_Manage environment variables and configuration validation._
- Generate `.env` and `.env.example` with all required variables for local/dev/prod. Output: both files.
- Scaffold a `ConfigModule` with schema validation using `@nestjs/config` and `joi`. Output: `src/config/` with validation logic.
- Generate Markdown documentation listing all environment variables, their types, and defaults. Output: `docs/env.md`.

## setup_database
_Set up ORM, database schema, and migration tooling._
- Generate ORM config (e.g., MikroORM/TypeORM/Prisma) and install dependencies. Output: `ormconfig.js` or equivalent.
- Scaffold initial entity/model classes for each domain (e.g., User, List, Item). Output: `src/entities/`.
- Generate migration and seeding scripts for initial schema and test data. Output: `migrations/`, `seed.ts`.
- Provide test scripts to verify DB connection and migration success. Output: `test/db-connection.spec.ts`.

## generate_auth_module
_Implement authentication with secure user management._
- Scaffold `AuthModule` with JWT strategy, User entity, registration, login, and password reset endpoints. Output: `src/auth/`, `src/users/`.
- Add DTOs with validation for all auth endpoints. Output: `src/auth/dto/`.
- Implement password hashing (bcrypt) and JWT config. Output: service logic and config.
- Add guards for protected routes. Output: `src/auth/guards/`.
- Provide unit tests for registration, login, and guard logic. Output: `test/auth/`.

## implement_rbac
_Enforce role-based access control for all sensitive actions._
- Generate enums for roles and permissions. Output: `src/auth/roles.enum.ts`.
- Scaffold RBAC guards and custom decorators for role checks. Output: `src/auth/guards/`, `src/auth/decorators/`.
- Add RBAC checks to controllers/services for all protected endpoints. Output: controller/service logic.
- Implement admin/owner/role seeding in DB seed scripts. Output: `seed.ts`.
- Provide tests for RBAC enforcement. Output: `test/rbac/`.

## scaffold_crud
_Scaffold CRUD modules for each main entity with validation and docs._
- For each entity (e.g., List, Item, User), generate a module, controller, and service with full CRUD endpoints. Output: `src/{entity}/`.
- Generate DTOs with class-validator decorators for all input. Output: `src/{entity}/dto/`.
- Add OpenAPI decorators for all endpoints. Output: controller annotations.
- Provide unit tests for CRUD logic. Output: `test/{entity}/`.

## write_tests
_Ensure all business logic is covered by unit and e2e tests._
- Generate unit tests for all services, controllers, and guards. Output: `test/`.
- Generate e2e tests for all API endpoints using Jest and Supertest. Output: `test/e2e/`.
- Configure test coverage reporting. Output: coverage reports and CI integration.

## add_i18n
_Add internationalization support for user-facing content._
- Scaffold i18n module and config using `nestjs-i18n`. Output: `src/i18n/`.
- Generate base and locale translation files (e.g., `en.json`, `es.json`). Output: `src/i18n/locales/`.
- Refactor all user-facing strings to use i18n keys. Output: code changes in controllers/services.
- Implement language switcher and locale detection logic. Output: middleware or service.
- Provide tests for i18n logic. Output: `test/i18n/`.

## setup_notifications
_Implement notification system for key events and user preferences._
- Scaffold Notification module, entity, and service. Output: `src/notifications/`.
- Integrate with email/SMS/push providers (mocked for dev). Output: service logic.
- Add triggers for key events (e.g., new item, password reset). Output: event handlers.
- Implement notification preferences and opt-in/out logic. Output: user settings and service logic.
- Provide tests for notification delivery and preferences. Output: `test/notifications/`.

## enforce_validation
_Enforce input validation for all API endpoints._
- Add class-validator decorators to all DTOs. Output: `src/**/dto/`.
- Provide tests for validation errors and edge cases. Output: `test/validation/`.

## setup_error_handling
_Standardize error handling and response format._
- Implement a global exception filter for consistent error responses. Output: `src/common/filters/`.
- Define a standardized error response schema. Output: shared types/docs.
- Provide tests for error handling. Output: `test/errors/`.

## add_audit_logging
_Track all critical data changes for compliance and debugging._
- Generate `AuditLog` entity with fields: id, action, entity, entityId, userId, timestamp, changes. Output: `src/audit-logs/`.
- Implement service to record audit logs on create/update/delete for all major entities. Output: service logic and hooks.
- Integrate audit logging with RBAC (record user/role) and notifications (trigger alerts on sensitive actions). Output: cross-module logic.
- Provide tests to verify audit entries are created for each action. Output: `test/audit-logs/`.

## add_health_checks
_Expose health and readiness endpoints for monitoring._
- Generate `/health` endpoint using `@nestjs/terminus`. Output: `src/health/`.
- Add checks for DB, cache, and external services. Output: health indicators.
- Provide tests for health endpoints. Output: `test/health/`.

## configure_monitoring
_Integrate with monitoring and alerting tools._
- Add integration with Prometheus, Grafana, or similar (mocked for dev). Output: monitoring config and docs.

## implement_batch_jobs
_Implement batch processing for scheduled and background tasks._
- Scaffold batch job processor/service using `@nestjs/schedule` or Bull. Output: `src/batch/`.
- Generate handlers for notifications, analytics, and cleanup jobs. Output: job logic.
- Add scheduling and error handling for jobs. Output: config and service logic.
- Provide tests for batch job execution and error cases. Output: `test/batch/`.

## implement_soft_delete
_Implement soft deletion and data retention policies._
- Add `deletedAt` flag to all major entities. Output: entity/model changes.
- Implement logic for soft delete and recovery in services. Output: service logic.
- Generate data retention and cleanup policy code. Output: scheduled jobs or scripts.
- Provide tests for soft delete and recovery. Output: `test/soft-delete/`.

## add_test_coverage
_Track and enforce test coverage targets._
- Configure Jest to generate coverage reports and fail CI if below threshold. Output: config and CI scripts.

## generate_api_docs
_Generate and maintain API documentation._
- Scaffold Swagger/OpenAPI config and install dependencies. Output: `src/swagger/` and docs endpoint.
- Add controller and DTO annotations for all endpoints. Output: code annotations.
- Provide static API documentation and versioning logic. Output: docs build script.

## manage_docs_versioning
_Manage versioning for API and developer documentation._
- Generate logic/scripts to version static API docs and changelogs. Output: versioned docs folders.

## setup_ci_cd
_Set up Docker and CI/CD pipelines for build, test, and deploy._
- Generate `Dockerfile` and `docker-compose.yml` for local/dev/prod. Output: files in project root.
- Scaffold CI pipeline config (e.g., GitHub Actions) for lint, test, build, and deploy. Output: `.github/workflows/`.

## manage_secrets
_Automate secure environment setup and secrets management._
- Generate scripts or config for managing secrets (e.g., Vault, dotenv, GitHub Secrets). Output: scripts and docs. 