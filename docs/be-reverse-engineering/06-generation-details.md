# Phase 2: Generation – Detailed Steps

## 1. For Each Module (wishlists, wishes, users, offers, auth)
- Create a folder in `/kupipodariday-backend-regen/src/` for the module.

## 2. For Each Instruction in the Mapping
- **scaffold_nestjs_module:**
  - Generate a NestJS module file (`<module>.module.ts`) and entity file (`entities/<entity>.entity.ts`).
  - Use standard NestJS module and entity conventions.
- **add_crud_endpoints:**
  - Generate a controller file (`<module>.controller.ts`) with CRUD endpoints for the entity.
  - Use NestJS decorators and DTOs for input validation.
- **implement_service_logic:**
  - Generate a service file (`<module>.service.ts`) with business logic for the entity.
  - Include standard CRUD methods and dependency injection.
- **add_dto:**
  - Generate DTO files (`dto/create-<entity>.dto.ts`, `dto/update-<entity>.dto.ts`) for create and update operations.
  - Use class-validator decorators for validation.
- **implement_guard:**
  - Generate guard files (`guards/<guard>.ts`) implementing NestJS `CanActivate` interface.
- **implement_strategy:**
  - Generate strategy files (`strategies/<strategy>.ts`) for authentication, following NestJS Passport strategy conventions.
- **implement_repository / implement_validation_service:**
  - Generate repository or validation service files as needed, following NestJS service conventions.
- **add_auth_endpoints / implement_auth_service:**
  - Generate authentication controller and service files with login, registration, and token logic.

## 3. Supporting Files
- Generate `main.ts` and `app.module.ts` in `/kupipodariday-backend-regen/src/` for NestJS bootstrap.
- Add configuration files (`tsconfig.json`, `nest-cli.json`, etc.) at the project root.

## 4. File Organization
- Each module: `/src/<module>/`
- Entities: `/src/<module>/entities/`
- DTOs: `/src/<module>/dto/`
- Guards: `/src/<module>/guards/`
- Strategies: `/src/<module>/strategies/`
- Services: `/src/<module>/` (or `/services/` if multiple)
- Controllers: `/src/<module>/` 