# Unified Action Mid-Level Pattern Library

This library defines mid-level, parameterized, composable patterns for AI-driven backend generation. Each pattern represents a logical unit of backend work, abstracting over atomic actions but remaining reusable and adaptable.

---

## scaffold_nestjs_module
**Purpose:** Scaffold a new NestJS module with controller, service, and DTOs for a given entity.
**Typical Outputs:** Module folder with controller, service, DTO files, and registration in app module.
**Key Parameters:** entity_name, fields, endpoints, validation, rbac, openapi
**Example:**
```yaml
pattern: scaffold_nestjs_module
params:
  entity_name: User
  fields: [id, email, password]
  endpoints: [create, read, update, delete]
  validation: true
  rbac: [admin, user]
  openapi: true
```

## add_crud_endpoints
**Purpose:** Add CRUD endpoints to an existing module/controller for a specific entity.
**Typical Outputs:** Controller methods, service methods, DTOs, OpenAPI decorators.
**Key Parameters:** entity_name, endpoints, validation, docs
**Example:**
```yaml
pattern: add_crud_endpoints
params:
  entity_name: Item
  endpoints: [create, read, update, delete]
  validation: true
  docs: true
```

## setup_authentication
**Purpose:** Set up authentication (e.g., JWT, session) for the application.
**Typical Outputs:** Auth module, service, controller, DTOs, guards, strategies.
**Key Parameters:** strategy, user_fields, password_reset, guards
**Example:**
```yaml
pattern: setup_authentication
params:
  strategy: jwt
  user_fields: [email, password]
  password_reset: true
  guards: [jwt, roles]
```

## implement_rbac
**Purpose:** Implement role-based access control for sensitive actions.
**Typical Outputs:** Roles/permissions enums, guards, decorators, RBAC checks in controllers/services.
**Key Parameters:** roles, permissions, entities
**Example:**
```yaml
pattern: implement_rbac
params:
  roles: [admin, user, guest]
  permissions: [read, write, delete]
  entities: [User, Item]
```

## configure_env_validation
**Purpose:** Configure environment variable validation and documentation.
**Typical Outputs:** .env, .env.example, config module, validation schema, env docs.
**Key Parameters:** variables, schema, docs
**Example:**
```yaml
pattern: configure_env_validation
params:
  variables: [DATABASE_URL, JWT_SECRET]
  schema: joi
  docs: true
```

## setup_database
**Purpose:** Set up ORM, schema, and migrations for the database.
**Typical Outputs:** ORM config, schema file, migration scripts, seed data.
**Key Parameters:** orm, entities, migrations, seed
**Example:**
```yaml
pattern: setup_database
params:
  orm: prisma
  entities: [User, Item, List]
  migrations: true
  seed: true
```

## add_i18n_support
**Purpose:** Add internationalization support for user-facing content.
**Typical Outputs:** i18n module, locale files, middleware, tests.
**Key Parameters:** locales, default_locale, middleware
**Example:**
```yaml
pattern: add_i18n_support
params:
  locales: [en, es, fr]
  default_locale: en
  middleware: true
```

## setup_notifications
**Purpose:** Implement notification system for key events and user preferences.
**Typical Outputs:** Notification module, service, entity, integration with providers, tests.
**Key Parameters:** channels, triggers, preferences
**Example:**
```yaml
pattern: setup_notifications
params:
  channels: [email, sms]
  triggers: [user_registered, password_reset]
  preferences: true
```

## enforce_validation
**Purpose:** Enforce input validation for all API endpoints using DTOs and class-validator.
**Typical Outputs:** DTOs with decorators, validation tests.
**Key Parameters:** entities, fields, decorators
**Example:**
```yaml
pattern: enforce_validation
params:
  entities: [User, Item]
  fields: [email, password, name]
  decorators: [IsEmail, IsString]
```

## setup_error_handling
**Purpose:** Standardize error handling and response format across the app.
**Typical Outputs:** Global exception filter, error schema, tests.
**Key Parameters:** error_schema, filter, docs
**Example:**
```yaml
pattern: setup_error_handling
params:
  error_schema: true
  filter: global
  docs: true
```

## add_audit_logging
**Purpose:** Track critical data changes for compliance and debugging.
**Typical Outputs:** Audit log entity, service, hooks, integration with RBAC/notifications.
**Key Parameters:** entities, actions, integration
**Example:**
```yaml
pattern: add_audit_logging
params:
  entities: [User, Item]
  actions: [create, update, delete]
  integration: [rbac, notifications]
```

## setup_ci_cd
**Purpose:** Set up Docker and CI/CD pipelines for build, test, and deploy.
**Typical Outputs:** Dockerfile, docker-compose.yml, CI config, scripts.
**Key Parameters:** docker, ci_provider, steps
**Example:**
```yaml
pattern: setup_ci_cd
params:
  docker: true
  ci_provider: github_actions
  steps: [lint, test, build, deploy]
``` 