# Unified Action Granular Backend Plan (AI-Generated, Canonical Patterns)

## 1. Project Initialization
- Generate NestJS project scaffold (scaffold_project)
- Generate TypeScript config with strict mode enabled (configure_typescript)
- Generate ESLint and Prettier configuration files (setup_linting)
- Generate initial Git repository structure and .gitignore (initialize_git)

## 2. Environment Configuration
- Generate .env and .env.example files with required variables (manage_env_config)
- Generate ConfigModule and validation schema code (manage_env_config)
- Generate documentation for environment variables (manage_env_config)

## 3. Database and ORM
- Generate ORM configuration and install dependencies (setup_database)
- Generate initial database schema and entity/model classes (setup_database)
- Generate migration and seeding scripts (setup_database)
- Generate test scripts for database connection and migrations (setup_database)

## 4. Authentication
- Generate AuthModule and User entity code (generate_auth_module)
- Generate registration and login endpoint code (generate_auth_module)
- Generate JWT/session token logic and configuration (generate_auth_module)
- Generate password hashing and reset flow code (generate_auth_module)
- Generate guards for protected routes (generate_auth_module)

## 5. RBAC and Access Control
- Generate roles and permissions enums (implement_rbac)
- Generate RBAC guards and decorators (implement_rbac)
- Generate RBAC checks in controllers/services (implement_rbac)
- Generate admin/owner/role seeding logic (implement_rbac)

## 6. CRUD Modules
- Generate module, controller, and service code for each entity (scaffold_crud)
- Generate DTOs and validation rules (scaffold_crud)
- Generate CRUD endpoint code (scaffold_crud)
- Generate RBAC guards for endpoints (implement_rbac)
- Generate unit tests for CRUD logic (write_tests)

## 7. Internationalization
- Generate i18n module configuration and install dependencies (add_i18n)
- Generate base and locale translation files (add_i18n)
- Refactor user-facing strings to use i18n keys (add_i18n)
- Generate language switcher and locale detection logic (add_i18n)

## 8. Notifications
- Generate Notification module and entity code (setup_notifications)
- Generate notification service and channel integration code (setup_notifications)
- Generate triggers for key events (setup_notifications)
- Generate notification preferences and opt-in/out logic (setup_notifications)

## 9. Validation and Error Handling
- Generate class-validator decorators for all DTOs (enforce_validation)
- Generate global exception filter code (setup_error_handling)
- Generate standardized error response format (setup_error_handling)
- Generate tests for validation and error cases (write_tests)

## 10. Audit Logging
- Generate AuditLog entity and service code (add_audit_logging)
- Generate hooks to log create/update/delete actions (add_audit_logging)
- Generate integration of audit logs with RBAC and notification modules (add_audit_logging)

## 11. Health Checks and Monitoring
- Generate /health endpoint code (add_health_checks)
- Generate checks for DB, cache, and external services (add_health_checks)
- Generate integration with monitoring/alerting tools (configure_monitoring)

## 12. Batch Processing
- Generate batch job processor/service code (implement_batch_jobs)
- Generate batch job handlers for notifications, analytics, cleanup (implement_batch_jobs)
- Generate scheduling and error handling logic for jobs (implement_batch_jobs)

## 13. Soft Deletion and Data Retention
- Generate soft delete flag in all major entities (implement_soft_delete)
- Generate logic for soft delete and recovery (implement_soft_delete)
- Generate data retention and cleanup policy code (implement_soft_delete)

## 14. Testing
- Generate unit tests for all services and controllers (write_tests)
- Generate e2e tests for all API endpoints (write_tests)
- Generate test coverage reporting configuration (add_test_coverage)

## 15. API Documentation
- Generate Swagger/OpenAPI configuration and install dependencies (generate_api_docs)
- Generate controller and DTO annotations for docs (generate_api_docs)
- Generate static API documentation and versioning logic (manage_docs_versioning)

## 16. Docker and CI/CD
- Generate Dockerfile and docker-compose.yml (setup_ci_cd)
- Generate CI pipeline configuration for lint, test, build, deploy (setup_ci_cd)
- Generate automation for environment setup and secrets management (manage_secrets) 