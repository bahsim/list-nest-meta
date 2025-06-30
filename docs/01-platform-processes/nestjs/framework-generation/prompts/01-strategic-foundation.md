# Stage 1: Strategic Foundation Generation

**Purpose:** Generate strategic planning and implementation guidance for a systematic NestJS backend framework

**Domain Context Required:** Clear understanding of your business domain, core entities, and key business rules

---

## Prompt 1: Strategic Plan Generation

```markdown
You are a senior technical architect creating strategic documentation for a systematic NestJS backend implementation framework.

## BUSINESS DOMAIN CONTEXT:
[INSERT YOUR DOMAIN HERE - Example: "Collective gift-giving platform where users create wishes, others fund them through offers"]

## CORE ENTITIES:
[INSERT YOUR ENTITIES - Example: "Users, Wishes, Wishlists, Offers"]

## KEY BUSINESS RULES:
[INSERT YOUR RULES - Example: "Users cannot fund their own wishes, offers cannot exceed remaining amounts, atomic updates required"]

## TECHNICAL REQUIREMENTS:
- NestJS backend with TypeORM and PostgreSQL
- JWT authentication with business rule enforcement
- Systematic AI-assisted code generation approach
- Complete API documentation with Swagger

## YOUR TASK:
Create a strategic plan (strategic-plan.md) that includes:

### 1. Strategic Intent
- Primary business outcome this framework enables
- Success definition for stakeholder approval
- How the systematic approach serves business goals

### 2. Architectural Approach  
- Configuration-driven generation philosophy
- Business-first implementation strategy
- Why systematic ordering reduces risk and increases velocity

### 3. Success Criteria & Quality Gates
- Phase approval requirements with specific validation criteria
- Quality standards for code, architecture, and security
- Integration readiness and handoff criteria

### 4. Expected Outcomes
- Delivery commitments for technical stakeholders
- Integration readiness for frontend development
- Long-term maintainability and scalability benefits

### 5. Decision Points
- Required approvals and resource allocation
- Timeline commitments and milestone validation
- Quality acceptance criteria

## DELIVERABLES:
- Business-focused strategic plan suitable for stakeholder review
- Clear approval criteria and quality gates
- Justification for systematic approach over ad-hoc development

## CONSTRAINTS:
- Must justify systematic approach with concrete business benefits
- Should address stakeholder concerns about development velocity
- Must establish clear quality standards and validation procedures
```

---

## Prompt 2: Implementation Plan Generation

```markdown
You are a technical lead creating comprehensive implementation guidance for systematic NestJS backend development.

## INPUT CONTEXT:
- Strategic plan from previous prompt
- Business domain: [YOUR DOMAIN]
- Systematic approach using IDGL (Intent-Driven Generative Lifecycle) framework

## YOUR TASK:
Create an implementation plan (implementation-plan.md) that includes:

### 1. Execution Timeline
- Total estimated time with phase breakdowns
- Resource requirements and team coordination
- Critical path dependencies and parallel work opportunities

### 2. Prerequisites & Environment Setup
- System requirements and tool installation
- Database setup and configuration requirements
- Environment validation commands and procedures

### 3. Configuration Framework Overview
- How configuration files drive systematic generation
- Step-specific artifacts and their purposes
- Validation commands and quality assurance procedures

### 4. Three-Phase Implementation Process

#### Phase 1: Project Scaffolding
- Automated foundation setup using NestJS CLI
- Module and dependency configuration
- Validation commands and success criteria

#### Phase 2: AI-Assisted Code Generation  
- Sequential step execution (Entities → DTOs → Services → Auth → Controllers → App Config)
- Configuration-driven code generation approach
- Validation procedures for each development step

#### Phase 3: Integration & System Validation
- Cross-module functionality verification
- Complex operation testing procedures
- Production readiness validation

### 5. Quality Assurance Framework
- Validation commands for each phase
- Error handling and troubleshooting procedures
- Integration testing and deployment verification

## DELIVERABLES:
- Step-by-step implementation guide with specific commands
- Timeline estimates and validation procedures
- Comprehensive quality assurance framework

## REQUIREMENTS:
- Must include specific validation commands for each step
- Should provide clear error handling and troubleshooting guidance
- Must establish systematic quality gates throughout development
```

---

## Prompt 3: High-Level Architecture Decision

```markdown
You are a software architect establishing the foundational approach for systematic NestJS backend generation.

## BUSINESS CONTEXT:
- Domain: [YOUR DOMAIN]
- Requirements: Systematic, maintainable, AI-assisted development approach
- Goal: Consistent quality and velocity across development teams

## YOUR TASK:
Document the high-level architectural decisions that will guide detailed design:

### 1. Two-Phase Strategic Design
- Why Scaffolding comes before Generation
- What each phase accomplishes and enables
- How phases reduce risk and enable quality validation

### 2. Six-Step Dependency Chain
- Entities → DTOs → Services → Auth → Controllers → App Config
- Why this specific ordering matters
- What breaks if ordering is violated
- How this supports both human and AI development

### 3. Configuration-Driven Approach
- Single source of truth for all generation decisions
- How configuration maps to implementation patterns
- Why this approach scales across teams and domains

### 4. Quality and Validation Strategy
- Built-in validation at each step
- How systematic approach prevents common mistakes
- Why incremental validation reduces overall development risk

## DELIVERABLES:
- Clear justification for two-phase approach
- Detailed explanation of six-step dependency chain
- Configuration strategy that supports systematic generation

## VALIDATION:
- Architecture decisions must be justified with concrete benefits
- Dependency ordering must be explained with technical reasoning
- Approach must demonstrate scalability across teams and domains
```

---

## Stage 1 Validation Checklist

### Strategic Plan Validation:
- [ ] Business outcomes clearly defined and measurable
- [ ] Stakeholder approval criteria specific and achievable
- [ ] Quality gates include both technical and business validation
- [ ] Timeline estimates realistic for team capabilities

### Implementation Plan Validation:
- [ ] Step-by-step instructions include specific commands
- [ ] Validation procedures verify successful completion
- [ ] Error handling provides clear troubleshooting guidance
- [ ] Quality assurance framework prevents common mistakes

### Architecture Decisions Validation:
- [ ] Two-phase approach justified with concrete benefits
- [ ] Six-step dependency chain explained with technical reasoning
- [ ] Configuration strategy supports systematic, repeatable generation
- [ ] Approach scales across multiple teams and business domains

**Completion Criteria:** All three documents provide clear, actionable guidance that enables systematic NestJS backend development with built-in quality assurance.

**Next Stage:** [02-architectural-design.md](02-architectural-design.md) - Detailed architectural design and dependency analysis 