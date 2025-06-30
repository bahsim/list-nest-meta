# Stage 3: Scaffolding Infrastructure Generation

**Purpose:** Generate automated foundation setup and validation procedures for systematic NestJS backend development

**Prerequisites:** Completed strategic foundation and architectural design from previous stages

---

## Prompt: Project Scaffolding Infrastructure Creation

```markdown
You are a DevOps automation specialist creating comprehensive foundation infrastructure for systematic NestJS backend generation.

## INPUT CONTEXT:
- Strategic and architectural plans from previous stages
- Business domain: [YOUR DOMAIN]
- Core entities: [YOUR ENTITIES]
- Target: Complete NestJS backend with [ENTITY] modules and authentication

## YOUR TASK:
Create the complete scaffolding phase infrastructure including:

### 1. Automated Scaffolding Script (scaffolding-script.sh)

#### Project Foundation Setup:
```bash
#!/bin/bash
# NestJS Project Scaffolding Script
# Domain: [YOUR DOMAIN]

echo "Creating NestJS project foundation..."

# Create new NestJS project
nest new [PROJECT-NAME] --package-manager npm

cd [PROJECT-NAME]

# Install dependencies
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/passport passport passport-local passport-jwt
npm install @nestjs/jwt @nestjs/config
npm install class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express
npm install bcrypt

# Install dev dependencies  
npm install --save-dev @types/passport-local @types/passport-jwt @types/bcrypt
```

#### Module Generation:
```bash
# Generate feature modules based on entities
[FOR EACH ENTITY]:
echo "Generating [ENTITY] module..."
nest generate module [entity-plural]
nest generate controller [entity-plural] --no-spec
nest generate service [entity-plural] --no-spec

# Generate authentication module
echo "Generating authentication module..."
nest generate module auth
nest generate controller auth --no-spec  
nest generate service auth --no-spec
```

#### Configuration Setup:
```bash
# Create configuration structure
mkdir src/config
touch src/config/database.config.ts
touch src/config/jwt.config.ts

# Create environment file
touch .env
echo "DATABASE_HOST=localhost" >> .env
echo "DATABASE_PORT=5432" >> .env
echo "DATABASE_NAME=[your-db-name]" >> .env
echo "DATABASE_USER=student" >> .env
echo "DATABASE_PASSWORD=student" >> .env
echo "JWT_SECRET=your-secret-key" >> .env
```

### 2. Database Configuration Setup

#### TypeORM Configuration:
Create proper database configuration with entity discovery and connection settings appropriate for your domain.

#### Environment Variable Management:
Set up secure environment variable handling for database credentials, JWT secrets, and other sensitive configuration.

### 3. Basic Module Structure Setup

#### Feature Module Templates:
Generate basic module structure for each entity with:
- Module class with proper imports and exports
- Controller class with basic CRUD endpoints
- Service class with placeholder methods
- Basic entity and DTO files ready for detailed implementation

#### Authentication Module Foundation:
Set up authentication module structure with:
- Auth module configuration
- Basic auth controller and service
- JWT strategy placeholder
- Guard structure ready for implementation

### 4. Development Environment Configuration

#### Package.json Scripts:
```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "typeorm": "typeorm-ts-node-commonjs"
  }
}
```

#### Swagger Configuration:
Set up basic Swagger documentation configuration that will be enhanced during generation phases.

### 5. Validation and Quality Checks

#### Compilation Validation:
```bash
# Verify TypeScript compilation
npm run build

# Check for linting issues
npm run lint

# Verify basic structure
echo "Checking module structure..."
ls -la src/
ls -la src/[entity-folders]/
```

#### Runtime Validation:
```bash
# Start development server
npm run start:dev

# Wait for startup
sleep 10

# Verify server responds
curl -I http://localhost:3000

# Check Swagger documentation endpoint
curl -I http://localhost:3000/api
```

#### Database Connection Validation:
```bash
# Test database connection
npm run typeorm -- schema:show

# Verify entity recognition
npm run typeorm -- entity:show
```

### 6. Error Handling and Troubleshooting

#### Common Setup Issues:
- Database connection problems and resolution steps
- Module import/export circular dependency detection
- TypeScript compilation errors and fixes
- Package dependency conflicts and resolution

#### Validation Failure Recovery:
- Steps to diagnose scaffolding problems
- How to reset and retry failed setup
- Environment-specific troubleshooting procedures

## TECHNICAL REQUIREMENTS:

### Project Structure:
- All [ENTITY] modules must be scaffolded with basic structure
- Authentication module must be configured with JWT foundation
- Database connection must be established and tested
- Swagger documentation must be accessible at /api endpoint

### Dependencies:
- All required NestJS packages properly installed
- TypeORM configured for PostgreSQL
- Passport JWT authentication dependencies ready
- Class-validator for input validation configured

### Validation Criteria:
- Application starts without compilation errors
- All modules load without circular dependency issues
- Database connection established successfully
- Basic API endpoints respond (even with placeholder data)
- Swagger UI accessible and displays basic structure

## DELIVERABLES:
- Executable bash script for complete project setup (scaffolding-script.sh)
- Database and environment configuration files
- Basic module structure for all entities and authentication
- Comprehensive validation commands and procedures
- Error handling and troubleshooting documentation

## VALIDATION COMMANDS:
```bash
# Post-scaffolding validation sequence
./scaffolding-script.sh
cd [PROJECT-NAME]
npm run build
npm run start:dev &
sleep 15
curl http://localhost:3000/api
curl http://localhost:3000/[entity-endpoints]
npm run typeorm -- schema:show
pkill -f "nest start"
```

## SUCCESS CRITERIA:
- Script creates working NestJS application without manual intervention
- All modules and dependencies properly configured
- Database connection established and entity recognition working
- Basic API structure accessible via Swagger documentation
- Project ready for systematic code generation phases
```

---

## Stage 3 Validation Checklist

### Scaffolding Script Validation:
- [ ] Script creates NestJS project without errors
- [ ] All required dependencies installed successfully
- [ ] Module generation completes for all entities
- [ ] Authentication module structure properly created

### Configuration Validation:
- [ ] Database configuration connects to PostgreSQL
- [ ] Environment variables properly configured
- [ ] JWT configuration ready for authentication implementation
- [ ] TypeORM entity discovery working correctly

### Project Structure Validation:
- [ ] All entity modules have controller, service, and basic structure
- [ ] Authentication module properly integrated
- [ ] Swagger documentation endpoint accessible
- [ ] Development scripts and tooling properly configured

### Quality Assurance:
- [ ] TypeScript compilation successful
- [ ] Linting passes without errors
- [ ] Application starts and responds to requests
- [ ] Database connection established and tested

### Error Handling:
- [ ] Common setup issues documented with solutions
- [ ] Validation failure recovery procedures provided
- [ ] Troubleshooting guidance for environment-specific problems

**Completion Criteria:** Executable scaffolding infrastructure that creates complete NestJS project foundation ready for systematic code generation phases.

**Next Stage:** [04-generation-configs.md](04-generation-configs.md) - Systematic code generation configuration framework 