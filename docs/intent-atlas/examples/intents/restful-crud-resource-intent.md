# RESTful CRUD for Resource X Intent (Universal Example)

**Purpose:**
Provide a standard, secure, and extensible API for creating, reading, updating, and deleting Resource X. This intent supports interoperability, automation, and integration in any modern application.

## Universal Flows
- Create Resource X (POST)
- Retrieve Resource X (GET by ID, GET list)
- Update Resource X (PUT/PATCH)
- Delete Resource X (DELETE, soft or hard)
- List/search/filter Resource X

## Key Considerations
- **Authentication & Authorization:** Secure endpoints, role-based access.
- **Validation:** Enforce schema and business rules on input.
- **Error Handling:** Consistent, informative error responses.
- **Versioning:** Support for API evolution.
- **Extensibility:** Custom fields, hooks, or events.
- **Documentation:** OpenAPI/Swagger or similar.

## Template Reference
- Based on: [intent-template-solo-dev.md](../templates/intent-template-solo-dev.md)
- See also: [intent-enriched-format-principle.md](../principles/intent-enriched-format-principle.md)

## How to Adapt
- **For GraphQL:** Replace REST endpoints with queries/mutations.
- **For Event-Driven Systems:** Add event publishing on CRUD actions.
- **For Multi-Tenant Apps:** Add tenant scoping and isolation.
- **For Highly Regulated Data:** Add audit logging and compliance checks.

---
This example is intended as a universal pattern. Adapt endpoints, validation, and security to your domain and technology stack. 