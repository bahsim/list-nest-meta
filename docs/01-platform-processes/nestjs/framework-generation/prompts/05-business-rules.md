# Stage 5: Business Rules & Supporting Documentation

**Purpose:** Generate comprehensive business rules reference and supporting documentation for systematic implementation

**Prerequisites:** Completed generation configuration framework from Stage 4

---

## Prompt: Business Rules Reference & Supporting Documentation

```markdown
You are a business analyst and technical writer creating comprehensive support documentation for systematic NestJS backend implementation.

## INPUT CONTEXT:
- Complete generation configuration framework from Stage 4
- Business domain: [YOUR DOMAIN]
- Core entities: [YOUR ENTITIES]
- Architectural approach: 6-step dependency-driven systematic development

## YOUR TASK:
Create comprehensive supporting documentation that enables consistent business rule enforcement and systematic development:

### 1. Business Rules Reference (business-rules-reference.md)

#### Authentication and Authorization Rules:
```markdown
## Authentication Rules

### Password Security
- **Rule:** All passwords must be hashed using bcrypt with minimum 10 salt rounds
- **Implementation:** `bcrypt.hash(password, 10)` in auth service
- **Validation:** Password length minimum 8 characters, require special characters
- **Error Handling:** Return generic "invalid credentials" for security

### JWT Token Management  
- **Rule:** JWT tokens expire in 24 hours, must include user ID and role
- **Implementation:** `jwt.sign({ userId, role }, secret, { expiresIn: '24h' })`
- **Validation:** Verify token signature and expiration on protected routes
- **Error Handling:** Return 401 Unauthorized for invalid/expired tokens

### Session Management
- **Rule:** Single active session per user, logout invalidates token
- **Implementation:** Track token blacklist or use short-lived tokens with refresh
- **Validation:** Check token blacklist on protected route access
- **Error Handling:** Force re-authentication for blacklisted tokens
```

#### Ownership and Permission Patterns:
```markdown
## Ownership Validation

### Resource Ownership  
- **Rule:** Users can only access/modify their own resources
- **Implementation:** 
  ```typescript
  if (currentUser.id !== resource.userId) {
    throw new ForbiddenException('Access denied: not resource owner');
  }
  ```
- **Validation:** Check ownership in service layer before any operations
- **Error Handling:** Return 403 Forbidden with clear error message

### [DOMAIN-SPECIFIC OWNERSHIP RULES]
[Add your domain-specific ownership patterns here]
- **Rule:** [Your specific rule]
- **Implementation:** [Code pattern]
- **Validation:** [How to check]
- **Error Handling:** [What to return]
```

#### [YOUR DOMAIN] Business Rules:
```markdown
## [YOUR DOMAIN] Specific Rules

### [BUSINESS RULE CATEGORY 1]
- **Rule:** [Specific business constraint]
- **Implementation:** [Code pattern that enforces the rule]
- **Validation:** [How to verify the rule is enforced]
- **Error Handling:** [What errors to return when rule is violated]

### [BUSINESS RULE CATEGORY 2]
- **Rule:** [Another business constraint]
- **Implementation:** [Implementation pattern]
- **Validation:** [Validation approach]
- **Error Handling:** [Error response pattern]

[Continue for all major business rules in your domain]
```

#### Data Integrity and Validation Rules:
```markdown
## Data Integrity

### Atomic Operations
- **Rule:** Multi-entity operations must be atomic (all succeed or all fail)
- **Implementation:** Use database transactions for related operations
- **Validation:** Test rollback scenarios and partial failure handling
- **Error Handling:** Roll back all changes and return meaningful error messages

### Unique Constraint Enforcement
- **Rule:** Email addresses, usernames, and business identifiers must be unique
- **Implementation:** Database unique constraints + service-level validation
- **Validation:** Check for duplicates before creation/update operations
- **Error Handling:** Return 409 Conflict with specific field information

### Required Field Validation
- **Rule:** All required fields must be validated at DTO and database levels
- **Implementation:** @IsNotEmpty() decorators + database NOT NULL constraints
- **Validation:** Test with missing/null/empty values
- **Error Handling:** Return 400 Bad Request with field-specific error messages
```

#### Error Handling and Validation Patterns:
```markdown
## Error Handling Standards

### HTTP Status Code Usage
- **200 OK:** Successful GET, PUT, PATCH operations
- **201 Created:** Successful POST operations
- **400 Bad Request:** Validation errors, malformed requests
- **401 Unauthorized:** Authentication required or failed
- **403 Forbidden:** Authenticated but insufficient permissions
- **404 Not Found:** Resource doesn't exist
- **409 Conflict:** Duplicate resource or business rule violation
- **500 Internal Server Error:** Unexpected server errors

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Email must be a valid email address"
    }
  ]
}
```

### Global Exception Filter Implementation
- **Rule:** All unhandled exceptions must be caught and logged
- **Implementation:** Global exception filter with logging and sanitized responses
- **Validation:** Test error scenarios and verify appropriate responses
- **Error Handling:** Never expose internal errors to clients
```

### 2. Code Generation Implementation Guide (code-generation-implementation-guide.md)

#### How to Use the Generation Framework:
```markdown
## Generation Framework Usage

### Step-by-Step Execution
1. **Prerequisites:** Ensure scaffolding phase completed successfully
2. **Configuration Review:** Verify all entity configurations match business requirements
3. **Sequential Generation:** Execute steps in dependency order (Entities → DTOs → Services → Auth → Controllers → App Config)
4. **Validation:** Test each step before proceeding to next
5. **Integration Testing:** Verify cross-module functionality after completion

### Configuration Customization
- **Entity Modifications:** Adjust field types, relationships, and constraints for your domain
- **Business Rule Mapping:** Ensure domain-specific rules are properly configured
- **Validation Requirements:** Customize validation decorators for business needs
- **Authentication Patterns:** Adapt auth configuration for security requirements

### Quality Assurance Procedures
- **Code Review:** Review generated code for business logic correctness
- **Testing Strategy:** Unit tests for services, integration tests for controllers
- **Security Validation:** Verify authentication and authorization enforcement
- **Performance Testing:** Ensure database queries and operations perform adequately
```

#### Troubleshooting Common Issues:
```markdown
## Common Generation Issues

### Configuration Problems
- **Incomplete Entity Definitions:** Ensure all required fields and relationships defined
- **Missing Business Rules:** Verify domain-specific constraints are configured
- **Inconsistent Naming:** Check entity and field naming consistency across steps

### Generation Failures
- **TypeScript Compilation Errors:** Verify type definitions and imports
- **Module Import Issues:** Check module dependency configuration
- **Database Connection Problems:** Verify environment configuration and credentials

### Business Logic Issues
- **Rule Enforcement Failures:** Test business rule validation in isolation
- **Permission Problems:** Verify ownership and access control implementation
- **Data Integrity Issues:** Test atomic operations and constraint enforcement
```

### 3. Framework Navigation and Quick Start (framework-quick-start.md)

#### Getting Started Guide:
```markdown
## Quick Start Guide

### For First-Time Users
1. **Understand the Domain:** Review business requirements and entity relationships
2. **Study the Process:** Read architectural design rationale to understand approach
3. **Execute Systematically:** Follow step-by-step generation in dependency order
4. **Validate Incrementally:** Test each step before proceeding

### For Framework Contributors
1. **Review Patterns:** Study existing configurations for consistency patterns
2. **Extend Systematically:** Add new entities following established patterns
3. **Maintain Dependencies:** Ensure new components respect dependency ordering
4. **Document Changes:** Update business rules and configuration documentation

### For Enterprise Teams
1. **Plan Resource Allocation:** Review timeline estimates and team requirements
2. **Customize Standards:** Adapt quality gates and validation procedures
3. **Train Team Members:** Ensure understanding of systematic approach
4. **Establish Governance:** Set up review processes and quality standards
```

## DOMAIN-SPECIFIC CUSTOMIZATION:

### Business Rules Specific to [YOUR DOMAIN]:
[Insert detailed business rules for your specific domain]

#### Examples for Different Domains:

**E-commerce:**
- Product inventory management rules
- Order processing and payment validation
- Customer account and shipping restrictions

**Project Management:**
- Task assignment and permission rules
- Project milestone and deadline constraints
- Team member access and role management

**Content Management:**
- Content publishing and approval workflows
- User permission and content access rules
- Version control and edit conflict resolution

**[YOUR DOMAIN]:**
[Add specific business rules for your domain]

## DELIVERABLES:
- Comprehensive business rules reference with implementation patterns
- Code generation implementation guide with troubleshooting
- Framework navigation and quick start documentation
- Domain-specific business rule customization

## VALIDATION CRITERIA:
- Business rules are unambiguous and implementable
- Implementation patterns are consistent across all entities
- Error scenarios are clearly defined and handled appropriately
- Documentation supports both manual and AI-assisted development
```

---

## Stage 5 Validation Checklist

### Business Rules Documentation:
- [ ] Authentication and authorization rules clearly defined
- [ ] Ownership and permission patterns include implementation code
- [ ] Domain-specific business rules mapped to technical implementation
- [ ] Data integrity and validation rules include error handling

### Implementation Guidance:
- [ ] Code generation procedures clearly documented
- [ ] Configuration customization guidance provided
- [ ] Troubleshooting covers common issues and solutions
- [ ] Quality assurance procedures support systematic development

### Framework Support:
- [ ] Navigation guidance for different user types
- [ ] Quick start procedures enable rapid team adoption
- [ ] Domain-specific customization examples provided
- [ ] Integration with existing documentation structure

### Quality Standards:
- [ ] Business rules are unambiguous and testable
- [ ] Implementation patterns support consistent enforcement
- [ ] Error handling provides clear user feedback
- [ ] Documentation supports long-term maintainability

**Completion Criteria:** Comprehensive business rules and implementation guidance that enables consistent, systematic development with clear quality standards and troubleshooting support.

**Next Stage:** [06-integration.md](06-integration.md) - Framework integration and completion documentation 