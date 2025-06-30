# Stage 4: Generation Configuration Framework

**Purpose:** Create systematic code generation configurations for step-by-step NestJS backend development

**Prerequisites:** Completed scaffolding infrastructure and architectural design

**⭐ Most Complex Stage:** This creates the core framework that drives AI-assisted code generation

---

## Prompt: Systematic Code Generation Configuration Framework

```markdown
You are an expert in AI-assisted code generation creating comprehensive configuration frameworks for systematic NestJS backend development.

## INPUT CONTEXT:
- Scaffolding infrastructure from Stage 3
- Architectural design with 6-step dependency chain from Stage 2
- Business domain: [YOUR DOMAIN]
- Core entities: [YOUR ENTITIES - e.g., User, Product, Order, Category]
- Complex business rules: [YOUR RULES - e.g., ownership validation, atomic operations, permission constraints]

## YOUR TASK:
Create complete configuration and prompt files for systematic 6-step code generation following the dependency chain: Entities → DTOs → Services → Auth → Controllers → App Config

### **STEP 1: Entities Configuration Framework**

Create `01-step-entities/` structure:

#### `types.ts` - Shared Entity Interfaces:
```typescript
export interface EntityFieldSpec {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'decimal' | 'text';
  required?: boolean;
  unique?: boolean;
  length?: number;
  precision?: number;
  scale?: number;
  default?: any;
}

export interface EntityRelationSpec {
  type: 'oneToMany' | 'manyToOne' | 'oneToOne' | 'manyToMany';
  target: string;
  joinColumn?: string;
  inverseProperty?: string;
  nullable?: boolean;
}

export interface EntitySpec {
  name: string;
  tableName: string;
  fields: EntityFieldSpec[];
  relations?: EntityRelationSpec[];
  indexes?: string[];
  businessRules?: string[];
}
```

#### Entity-Specific Configuration Files:
Create separate configuration files for each entity:
- `entities/user-entity.ts` - User entity with authentication fields
- `entities/[entity]-entity.ts` - For each business entity
- `entity-generation-config.ts` - Clean index importing all entities

#### `entity-generation-prompt.md` - Complete Entity Generation Instructions:
Detailed prompt for generating TypeORM entities with:
- Proper decorators (@Entity, @Column, @OneToMany, etc.)
- Business rule constraints
- Relationship configurations
- Index specifications
- Validation criteria

### **STEP 2: DTOs Configuration Framework**

Create `02-step-dtos/` structure:

#### `types.ts` - Shared DTO Interfaces:
```typescript
export interface DTOFieldSpec {
  name: string;
  type: string;
  required?: boolean;
  validationDecorators: ValidationDecorator[];
  apiPropertyConfig: ApiPropertySpec;
}

export interface ValidationDecorator {
  name: string;
  params?: any[];
  message?: string;
}

export interface CreateDTOSpec {
  entityName: string;
  className: string;
  fields: DTOFieldSpec[];
  businessRules: string[];
}

export interface UpdateDTOSpec {
  entityName: string;
  className: string;
  fields: DTOFieldSpec[];
  partialUpdate: boolean;
  businessRules: string[];
}
```

#### Granular DTO Configuration Files:
- `dtos/create-[entity]-dto.ts` - Create DTO specifications for each entity
- `dtos/update-[entity]-dto.ts` - Update DTO specifications for each entity
- `dto-generation-config.ts` - Clean index importing all DTOs

#### `dto-generation-prompt.md` - Complete DTO Generation Instructions:
Comprehensive prompt for generating DTOs with:
- class-validator decorators
- Swagger API property decorators
- Business rule validation
- Partial update handling

### **STEP 3: Services Configuration Framework**

Create `03-step-services/` structure:

#### `types.ts` - Shared Service Interfaces:
```typescript
export interface ServiceMethodSpec {
  name: string;
  returnType: string;
  parameters: ParameterSpec[];
  businessRules: BusinessRuleSpec[];
  errorHandling: ErrorHandlingSpec[];
  validation: ValidationSpec[];
}

export interface BusinessRuleSpec {
  rule: string;
  implementation: string;
  errorMessage: string;
  errorCode?: string;
}

export interface ServiceSpec {
  entityName: string;
  className: string;
  methods: ServiceMethodSpec[];
  dependencies: string[];
  businessRules: BusinessRuleSpec[];
}
```

#### Service-Specific Configuration Files:
- `services/user-service.ts` - User management with authentication
- `services/[entity]-service.ts` - Business logic for each entity
- `services-generation-config.ts` - Clean index importing all services

#### `services-generation-prompt.md` - Complete Service Generation Instructions:
Detailed prompt for generating services with:
- Complete CRUD operations
- Business rule enforcement
- Error handling and validation
- Repository pattern implementation

### **STEP 4: Authentication Configuration Framework**

Create `04-auth/` structure:

#### `types.ts` - Shared Auth Interfaces:
```typescript
export interface AuthConfigSpec {
  jwtConfig: JWTConfigSpec;
  passwordConfig: PasswordConfigSpec;
  strategies: AuthStrategySpec[];
  guards: AuthGuardSpec[];
}

export interface JWTConfigSpec {
  secret: string;
  expiresIn: string;
  issuer?: string;
  audience?: string;
}

export interface AuthGuardSpec {
  name: string;
  type: 'jwt' | 'local' | 'custom';
  implementation: string;
  businessRules?: string[];
}
```

#### Granular Auth Configuration Files:
- `auths/auth-config.ts` - JWT and password configuration
- `auths/auth-strategies.ts` - Passport.js strategy configurations
- `auths/auth-guards.ts` - Authentication guard specifications
- `auths/auth-service.ts` - Authentication service methods
- `auths/auth-controller.ts` - Authentication endpoints
- `auth-generation-config.ts` - Clean index importing all auth components

#### `auth-generation-prompt.md` - Complete Auth Generation Instructions:
Comprehensive prompt for generating authentication system with:
- JWT token management
- Password hashing and validation
- Passport strategies and guards
- Login/logout/register endpoints

### **STEP 5: Controllers Configuration Framework**

Create `05-controllers/` structure:

#### `types.ts` - Shared Controller Interfaces:
```typescript
export interface EndpointSpec {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  operationId: string;
  summary: string;
  description: string;
  parameters: ParameterSpec[];
  requestBody?: RequestBodySpec;
  responses: ResponseSpec[];
  guards?: string[];
  businessRules?: string[];
}

export interface ControllerSpec {
  entityName: string;
  className: string;
  basePath: string;
  endpoints: EndpointSpec[];
  dependencies: string[];
}
```

#### Controller-Specific Configuration Files:
- `controllers/user-controller.ts` - User management endpoints
- `controllers/[entity]-controller.ts` - REST endpoints for each entity
- `controllers-generation-config.ts` - Clean index importing all controllers

#### `controllers-generation-prompt.md` - Complete Controller Generation Instructions:
Detailed prompt for generating controllers with:
- Complete REST API endpoints
- Swagger documentation decorators
- Authentication guards and validation
- Business rule enforcement

### **STEP 6: App Configuration Framework**

Create `06-step-app-config/` structure:

#### `types.ts` - Shared App Config Interfaces:
```typescript
export interface AppConfigSpec {
  appModule: AppModuleSpec;
  main: MainSpec;
  database: DatabaseConfigSpec;
  environment: EnvironmentSpec;
}

export interface AppModuleSpec {
  imports: ModuleImportSpec[];
  controllers: string[];
  providers: string[];
  globalMiddleware: string[];
  globalPipes: string[];
  globalFilters: string[];
}
```

#### App Config Component Files:
- `app-configs/app-module-config.ts` - Module imports and configuration
- `app-configs/main-config.ts` - Server and Swagger configuration
- `app-configs/database-config.ts` - Database connection settings
- `app-configs/environment-config.ts` - Environment variables
- `app-configs/module-specs.ts` - Feature module specifications
- `app-configs/validation-rules.ts` - Global application rules
- `app-config-generation-config.ts` - Clean index importing all configs

#### `app-config-generation-prompt.md` - Complete App Config Instructions:
Comprehensive prompt for generating application configuration with:
- Module integration and dependency injection
- Global pipes, filters, and middleware
- Database and environment configuration
- Swagger documentation setup

## BUSINESS RULES INTEGRATION:

For each step, ensure business rules are mapped to implementation patterns:

### Domain-Specific Business Rules:
[INSERT YOUR BUSINESS RULES - Examples:]
- "Users can only edit their own content" → Ownership validation in services and guards
- "Orders cannot exceed inventory limits" → Atomic inventory checking in service methods
- "[Entity] requires approval workflow" → Status-based validation and state management

### Implementation Patterns:
```typescript
// Example business rule implementation pattern
export const businessRules = [
  {
    rule: "OWNERSHIP_VALIDATION",
    description: "Users can only access their own resources",
    implementation: `
      if (currentUser.id !== resource.userId) {
        throw new ForbiddenException('Access denied: not resource owner');
      }
    `,
    appliesTo: ["services", "controllers", "guards"]
  }
];
```

## GRANULAR PATTERN REQUIREMENTS:

### Consistent Organization:
- `types.ts` file with shared interfaces for each step
- Entity/component-specific configuration files in subdirectories
- Clean index files importing from granular components
- Consistent naming and organizational patterns

### Configuration Completeness:
- Each configuration must be detailed enough for AI code generation
- Business rules must be explicitly mapped to implementation patterns
- Validation criteria must be specific and testable
- Error handling must be comprehensive and consistent

### Quality Assurance:
- Each step must include validation commands and success criteria
- Generated code must be production-ready with proper error handling
- Configuration consistency across all entities and components
- Clear dependency relationships between steps

## DELIVERABLES:
- 6 complete step directories with granular configurations (30+ files total)
- Comprehensive generation prompt files with detailed instructions
- Shared business rules reference with implementation patterns
- Validation procedures and quality assurance framework

## VALIDATION CRITERIA:
- Configurations detailed enough for reliable AI code generation
- Business rules consistently enforced across all steps
- Dependency chain properly implemented with clear ordering
- Generated framework supports systematic, repeatable development
```

---

## Stage 4 Validation Checklist

### Configuration Completeness:
- [ ] All 6 steps have complete configuration frameworks
- [ ] Each entity has dedicated configuration files
- [ ] Business rules are explicitly mapped to implementation patterns
- [ ] Validation criteria are specific and testable

### Granular Organization:
- [ ] Consistent `types.ts` files with shared interfaces
- [ ] Entity-specific configurations in appropriate subdirectories
- [ ] Clean index files importing from granular components
- [ ] Naming and organizational patterns consistent across steps

### Generation Readiness:
- [ ] Configurations detailed enough for AI code generation
- [ ] Prompt files include comprehensive implementation instructions
- [ ] Business rule enforcement patterns clearly specified
- [ ] Error handling and validation procedures included

### Quality Framework:
- [ ] Each step includes specific validation commands
- [ ] Success criteria clearly defined and measurable
- [ ] Dependency relationships properly documented
- [ ] Integration procedures support systematic development

**Completion Criteria:** Complete systematic code generation framework that enables reliable AI-assisted development of production-ready NestJS backends following dependency-driven ordering.

**Next Stage:** [05-business-rules.md](05-business-rules.md) - Business rules documentation and implementation patterns 