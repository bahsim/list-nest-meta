# Architecture Elements and Global Patterns

This document summarizes the main architectural elements and global patterns for the backend. It covers the root module structure, database configuration, module imports, authentication guards and strategies, and key architectural patterns.

---

## AppModule (Root Module)

- **Purpose:** Central entry point for the NestJS application, orchestrating all modules and global configuration.
- **Imports:**
  - `TypeOrmModule.forRoot` — Configures PostgreSQL connection (host, port, username, password, database, schema, entities, synchronize).
  - `UsersModule`, `WishesModule`, `WishlistsModule`, `OffersModule`, `AuthModule` — Feature modules encapsulating domain logic.
- **Controllers:**
  - `AppController` — Root controller (minimal responsibilities).
- **Providers:**
  - None at the root level (feature-specific providers are registered in their respective modules).

---

## Database Configuration

- **Type:** PostgreSQL
- **Connection:** Localhost, port 5432, user `student`, password `student`, database/schema `nest_project`.
- **Entities:** `User`, `Wish`, `Wishlist`, `Offer` (registered for ORM mapping).
- **Synchronization:** Enabled (auto-creates/updates schema based on entities).

---

## Authentication Guards

- **JwtAuthGuard:**
  - Extends NestJS `AuthGuard('jwt')`.
  - Used to protect endpoints requiring JWT authentication.
  - Applied via `@UseGuards(JwtAuthGuard)` in controllers.

- **LocalAuthGuard:**
  - Extends NestJS `AuthGuard('local')`.
  - Used for username/password authentication (login endpoint).
  - Can override `canActivate` for custom logic.

---

## Authentication Strategies

- **JwtStrategy:**
  - Uses Passport's JWT strategy.
  - Extracts JWT from Authorization header (Bearer token).
  - Validates token using secret from configuration.
  - On success, attaches user info (`id`, `username`) to request.

- **LocalStrategy:**
  - Uses Passport's local strategy.
  - Authenticates using username and password fields.
  - Delegates validation to `AuthService.validatePassword`.
  - Throws `UnauthorizedException` on failure.

---

## Modular Architecture

- **Feature Modules:** Each domain (users, wishes, wishlists, offers, auth) is encapsulated in its own module, following NestJS best practices.
- **Separation of Concerns:** Business logic, data access, and API layers are separated into services, repositories, and controllers.
- **Entity-Driven:** All persistence is managed via TypeORM entities and repositories.

---

## Global Patterns

- **Guards:** Used for authentication and authorization at the controller/method level.
- **DTOs and Validation:** Input data is validated using DTOs and class-validator decorators.
- **RESTful Routing:** Endpoints are resource-oriented and follow REST conventions.
- **Configuration:** Sensitive values (e.g., JWT secret) are loaded from a configuration module.
- **Auto Schema Sync:** Database schema is kept in sync with entities during development. 