# Unified Action Granular Backend Plan (Detailed, Canonical Patterns)

## 1. Project Initialization
- Scaffold a new NestJS project (scaffold_project)
  - Run `npm i -g @nestjs/cli`
  - Run `nest new project-name`
- Configure TypeScript with strict mode (configure_typescript)
  - Edit `tsconfig.json` to enable `strict`, `noImplicitAny`, etc.
  - Add path aliases if needed
- Set up ESLint and Prettier for code quality (setup_linting)
  - Install ESLint and Prettier: `npm i -D eslint prettier`
  - Add `.eslintrc.js` and `.prettierrc`
  - Add lint and format scripts to `package.json`
- Initialize Git repository and .gitignore (initialize_git)
  - Run `git init`
  - Add `.gitignore` for Node, environment files, etc.
  - Make initial commit

## 2. Environment Configuration
- Create .env and .env.example files (manage_env_config)
  - Add all required environment variables to `.env.example`
  - Copy to `.env` and fill with local values
- Implement ConfigModule and validation schema (manage_env_config)
  - Install `@nestjs/config` and `joi`
  - Create `config.module.ts` and validation schema
  - Import `ConfigModule.forRoot()` in `AppModule`
- Document all environment variables (manage_env_config)
  - Add comments to `.env.example`
  - Document in README

## 3. Database and ORM
- Install and configure ORM (setup_database)
  - Install ORM package: `npm i @mikro-orm/core @mikro-orm/migrations` or `npm i @prisma/client`
  - Generate initial config file (e.g., `mikro-orm.config.ts` or `prisma/schema.prisma`)
- Define initial database schema and entities (setup_database)
  - Write entity/model classes
  - Define relationships and indexes
- Set up migration and seeding scripts (setup_database)
  - Create migration files
  - Write seed scripts for initial data
- Test database connection and migrations (setup_database)
  - Run migrations
  - Run seed scripts
  - Verify connection in logs

## 4. Authentication
- Generate AuthModule and User entity (generate_auth_module)
  - Run `nest g module auth` and `nest g module users`
  - Create `User` entity/model
- Implement registration and login endpoints (generate_auth_module)
  - Add `POST /register` and `POST /login` endpoints in `auth.controller.ts`
  - Write DTOs for registration and login
- Add JWT/session token logic (generate_auth_module)
  - Install `@nestjs/jwt` and `passport`
  - Configure JWT strategy and secret
  - Add token generation in login flow
- Implement password hashing and reset flow (generate_auth_module)
  - Install `bcrypt`
  - Hash passwords before saving
  - Add password reset endpoint and email logic
- Add guards for protected routes (generate_auth_module)
  - Implement `JwtAuthGuard`
  - Use `@UseGuards()` on protected controllers

## 5. RBAC and Access Control
- Define roles and permissions enums (implement_rbac)
  - Create `roles.enum.ts` and `permissions.enum.ts`
- Implement RBAC guards and decorators (implement_rbac)
  - Write `RolesGuard` and `@Roles()` decorator
- Integrate RBAC checks in controllers/services (implement_rbac)
  - Add guards and decorators to endpoints
- Add admin/owner/role seeding logic (implement_rbac)
  - Add seed data for admin user and roles

## 6. CRUD Modules
- Scaffold module, controller, and service for each entity (scaffold_crud)
  - Run `nest g module <entity>`
  - Run `nest g controller <entity>`
  - Run `nest g service <entity>`
- Define DTOs and validation rules (scaffold_crud)
  - Create DTO classes for create/update
  - Add class-validator decorators
- Implement CRUD endpoints (scaffold_crud)
  - Add REST endpoints in controller
  - Implement service methods for each operation
- Add RBAC guards to endpoints (implement_rbac)
  - Use `@Roles()` and guards on CRUD endpoints
- Write unit tests for CRUD logic (write_tests)
  - Write tests for service and controller methods

## 7. Internationalization
- Install and configure i18n module (add_i18n)
  - Install `nestjs-i18n` or similar
  - Add i18n config to `AppModule`
- Create base and locale translation files (add_i18n)
  - Create `en.json`, `es.json`, etc. in `i18n/` folder
- Refactor user-facing strings to use i18n (add_i18n)
  - Replace hardcoded strings with i18n keys
- Add language switcher and locale detection (add_i18n)
  - Add middleware or interceptor for locale detection

## 8. Notifications
- Scaffold Notification module and entity (setup_notifications)
  - Run `nest g module notifications`
  - Create `Notification` entity/model
- Implement notification service and channels (setup_notifications)
  - Write service for sending notifications
  - Integrate with email/SMS/push providers
- Add triggers for key events (setup_notifications)
  - Add hooks in services to trigger notifications
- Integrate notification preferences and opt-in/out (setup_notifications)
  - Add user preferences for notification types

## 9. Validation and Error Handling
- Add class-validator decorators to all DTOs (enforce_validation)
  - Add `@IsString()`, `@IsEmail()`, etc. to DTOs
- Implement global exception filter (setup_error_handling)
  - Create `AllExceptionsFilter`
  - Use `app.useGlobalFilters()` in main.ts
- Standardize error response format (setup_error_handling)
  - Define error response DTO
  - Update exception filter to use standard format
- Write tests for validation and error cases (write_tests)
  - Write tests for invalid input and error scenarios

## 10. Audit Logging
- Scaffold AuditLog entity and service (add_audit_logging)
  - Create `AuditLog` entity/model
  - Write audit logging service
- Add hooks to log create/update/delete actions (add_audit_logging)
  - Add hooks in services or use ORM middleware
- Integrate audit logs with RBAC and notification modules (add_audit_logging)
  - Add references to user/role in audit logs

## 11. Health Checks and Monitoring
- Implement /health endpoint (add_health_checks)
  - Add `/health` route in a controller
  - Return status of DB, cache, etc.
- Add checks for DB, cache, and external services (add_health_checks)
  - Implement service checks in health controller
- Integrate with monitoring/alerting tools (configure_monitoring)
  - Set up Prometheus, Grafana, or similar

## 12. Batch Processing
- Scaffold batch job processor/service (implement_batch_jobs)
  - Create batch job service/module
- Implement batch jobs for notifications, analytics, cleanup (implement_batch_jobs)
  - Write job handlers for each batch task
- Add scheduling and error handling for jobs (implement_batch_jobs)
  - Use `@nestjs/schedule` or similar
  - Add error handling and retries

## 13. Soft Deletion and Data Retention
- Add soft delete flag to all major entities (implement_soft_delete)
  - Add `deletedAt` or `isDeleted` field to entities
- Implement logic for soft delete and recovery (implement_soft_delete)
  - Update services to use soft delete
  - Add recovery endpoints if needed
- Enforce data retention and cleanup policies (implement_soft_delete)
  - Write scheduled job for permanent deletion

## 14. Testing
- Write unit tests for all services and controllers (write_tests)
  - Use Jest to write service/controller tests
- Write e2e tests for all API endpoints (write_tests)
  - Use Supertest or similar for e2e
- Add test coverage reporting (add_test_coverage)
  - Configure Jest coverage

## 15. API Documentation
- Install and configure Swagger/OpenAPI (generate_api_docs)
  - Install `@nestjs/swagger`
  - Add SwaggerModule to main.ts
- Annotate controllers and DTOs for docs (generate_api_docs)
  - Use `@ApiProperty`, `@ApiTags`, etc.
- Publish and version API documentation (manage_docs_versioning)
  - Generate static docs and publish

## 16. Docker and CI/CD
- Write Dockerfile and docker-compose.yml (setup_ci_cd)
  - Write `Dockerfile` for app
  - Write `docker-compose.yml` for services
- Set up CI pipeline for lint, test, build, deploy (setup_ci_cd)
  - Configure GitHub Actions, GitLab CI, or similar
- Automate environment setup and secrets management (manage_secrets)
  - Use Docker secrets, Vault, or CI/CD secrets 