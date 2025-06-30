# Technical Glossary

This document defines technical terms, patterns, and concepts specific to the WishListShare backend. It serves as a reference for developers to understand project-specific terminology and implementation patterns.

---

## 🎯 **Business Domain Terms**

### **Wish**
A desired item or gift that a user wants to receive, containing price, description, and funding progress.

**Properties:**
- `name`: Display name of the desired item
- `price`: Target amount needed for the item
- `raised`: Current amount contributed through offers
- `copied`: Number of times other users have copied this wish
- `link`: URL to the item on external website
- `image`: URL to item image

**Business Rules:**
- Cannot be edited if offers exist
- Can be copied by any authenticated user
- Progress = `(raised / price) * 100`

### **Offer**
A monetary contribution toward someone else's wish, representing partial funding of a desired item.

**Properties:**
- `amount`: Contribution amount (must be ≤ available amount)
- `hidden`: Boolean flag for anonymous contributions
- `user`: The contributor making the offer
- `wish`: The wish receiving the contribution

**Business Rules:**
- Cannot exceed `(wish.price - wish.raised)`
- Cannot be made on own wishes
- Immutable after creation (no edits/deletes)

### **Wishlist**
A curated collection of wishes organized by theme or purpose.

**Properties:**
- `name`: Collection name
- `description`: Optional description of the collection
- `items`: Array of wishes in the collection
- `owner`: User who created the wishlist

**Business Rules:**
- Can contain wishes from multiple users
- Owner controls membership of wishes

### **Collective Gift Funding**
The core business model where multiple users contribute money toward a single expensive gift.

**Benefits:**
- Enables purchase of high-value items
- Distributes cost among community
- Optional anonymity for contributors
- Social recognition for participation

---

## 🏗️ **Technical Architecture Terms**

### **Module**
A NestJS organizational unit encapsulating related functionality with clear boundaries.

**Structure:**
```
ModuleName/
├── module-name.module.ts     # Module definition
├── module-name.controller.ts # HTTP endpoints
├── module-name.service.ts    # Business logic
├── entities/                 # Database entities
├── dto/                      # Data transfer objects
└── guards/                   # Access control (optional)
```

**Examples:** `WishesModule`, `UsersModule`, `OffersModule`

### **Service Layer**
Business logic layer that handles data manipulation, validation, and business rules enforcement.

**Responsibilities:**
- Implement business rules
- Coordinate between repositories
- Handle transactions
- Validate business constraints

**Pattern:**
```typescript
@Injectable()
export class SomeService {
  constructor(
    @InjectRepository(Entity) 
    private repository: Repository<Entity>
  ) {}
}
```

### **DTO (Data Transfer Object)**
Validated input/output structures that define API contracts and ensure data integrity.

**Purpose:**
- Input validation using `class-validator`
- Type safety for API contracts
- Documentation of expected data structure
- Security through whitelisting

**Example:**
```typescript
export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNumber()
  @Min(1)
  price: number;
}
```

### **Entity**
TypeORM database model representing a table and its relationships.

**Features:**
- Database schema definition
- Relationship mapping
- Validation rules
- Automatic timestamps

**Example:**
```typescript
@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;
}
```

---

## 🔐 **Authentication & Security Terms**

### **JWT (JSON Web Token)**
Stateless authentication mechanism used for securing API endpoints.

**Structure:**
- **Header:** Token type and signing algorithm
- **Payload:** User claims and metadata
- **Signature:** Verification hash

**Usage:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Guard**
NestJS access control mechanism that determines whether a request can proceed.

**Types:**
- `JwtAuthGuard`: Validates JWT tokens
- `LocalAuthGuard`: Validates username/password
- `OwnershipGuard`: Validates resource ownership

**Pattern:**
```typescript
@UseGuards(JwtAuthGuard)
@Get()
async findAll() {
  // Protected endpoint
}
```

### **Authentication Strategy**
Passport.js strategy defining how to validate user credentials.

**Strategies Used:**
- `JWT Strategy`: Validates and decodes JWT tokens
- `Local Strategy`: Validates username/password combinations

### **Authorization**
Process of determining what authenticated users can access or modify.

**Levels:**
- **Resource Level:** Can user access this wish/offer?
- **Operation Level:** Can user edit/delete this resource?
- **Data Level:** What data should user see?

---

## 💾 **Database & ORM Terms**

### **TypeORM**
Object-Relational Mapping library providing TypeScript decorators for database operations.

**Key Features:**
- Entity definition with decorators
- Relationship management
- Query builder
- Migration system
- Connection pooling

### **Repository**
TypeORM data access pattern providing CRUD operations for entities.

**Methods:**
- `find()`: Query multiple records
- `findOne()`: Query single record
- `save()`: Insert or update
- `remove()`: Delete records

### **Relation Loading**
Strategy for fetching associated data to avoid N+1 query problems.

**Types:**
- **Eager Loading:** Always load relations
- **Lazy Loading:** Load relations on access
- **Explicit Loading:** Specify relations in query

**Example:**
```typescript
// Load wishes with their owners and offers
const wishes = await this.wishRepository.find({
  relations: ['owner', 'offers', 'offers.user'],
});
```

### **Migration**
Versioned database schema changes that can be applied and rolled back.

**Commands:**
- `npm run migration:generate`: Create migration from entity changes
- `npm run migration:run`: Apply pending migrations
- `npm run migration:revert`: Rollback last migration

### **Query Builder**
TypeORM fluent interface for constructing complex SQL queries programmatically.

**Example:**
```typescript
const wishes = await this.wishRepository
  .createQueryBuilder('wish')
  .leftJoinAndSelect('wish.owner', 'owner')
  .where('wish.price > :minPrice', { minPrice: 50 })
  .orderBy('wish.createdAt', 'DESC')
  .take(20)
  .getMany();
```

---

## 🔄 **Data Flow & Processing Terms**

### **Request Lifecycle**
The flow of an HTTP request through the NestJS application layers.

**Stages:**
1. **Middleware:** Cross-cutting concerns (logging, CORS)
2. **Guards:** Authentication and authorization
3. **Interceptors:** Request/response transformation
4. **Pipes:** Validation and transformation
5. **Controller:** Route handling
6. **Service:** Business logic
7. **Repository:** Data access

### **Validation Pipe**
NestJS pipe that validates incoming data against DTO schemas.

**Features:**
- Automatic validation using `class-validator`
- Type transformation
- Whitelist unknown properties
- Custom error messages

### **Exception Filter**
NestJS mechanism for handling and transforming errors into HTTP responses.

**Standard Exceptions:**
- `BadRequestException` (400): Invalid input
- `UnauthorizedException` (401): Authentication required
- `ForbiddenException` (403): Access denied
- `NotFoundException` (404): Resource not found

### **Interceptor**
NestJS component that can transform requests/responses or add cross-cutting functionality.

**Use Cases:**
- Response transformation
- Logging
- Caching
- Performance monitoring

---

## 🎨 **Implementation Patterns**

### **Ownership Guard Pattern**
Security pattern ensuring users can only modify resources they own.

**Implementation:**
```typescript
if (resource.owner.id !== userId) {
  throw new ForbiddenException();
}
```

### **Business Rule Validation**
Pattern for enforcing complex business constraints in service layer.

**Example:**
```typescript
if (wish.offers.length > 0) {
  throw new ForbiddenException('Cannot edit wish that has offers');
}
```

### **Monetary Precision Pattern**
Pattern for handling currency values with exact decimal precision.

**Implementation:**
```typescript
@Transform(({ value }) => Math.round(Number(value) * 100) / 100)
price: number;
```

### **Transaction Pattern**
Database pattern ensuring atomic operations for complex business logic.

**Example:**
```typescript
return this.repository.manager.transaction(async (manager) => {
  // Multiple operations in single transaction
  await manager.update(Wish, id, { copied: wish.copied + 1 });
  return manager.save(copiedWish);
});
```

### **Conditional Relation Loading**
Pattern for loading different data based on user context or permissions.

**Example:**
```typescript
getRelations(isAuthenticated: boolean) {
  return isAuthenticated 
    ? ['owner', 'offers', 'offers.user']
    : ['owner'];
}
```

---

## 🧪 **Testing Terms**

### **Unit Test**
Test targeting a single component in isolation with mocked dependencies.

**Characteristics:**
- Fast execution
- No external dependencies
- Focused on business logic
- 60% of test pyramid

### **Integration Test**
Test verifying interaction between components, often including database.

**Characteristics:**
- Real database connections
- Multiple components working together
- Slower than unit tests
- 30% of test pyramid

### **E2E (End-to-End) Test**
Test simulating complete user workflows through HTTP API.

**Characteristics:**
- Full application stack
- Real HTTP requests
- Complete user scenarios
- 10% of test pyramid

### **Test Double**
Generic term for objects that replace dependencies in tests.

**Types:**
- **Mock:** Verifies behavior (method calls)
- **Stub:** Returns predetermined values
- **Spy:** Records interactions
- **Fake:** Simplified working implementation

---

## 🚀 **Deployment & Operations Terms**

### **Container**
Lightweight, portable execution environment containing application and dependencies.

**Benefits:**
- Consistent environments
- Easy deployment
- Resource isolation
- Scalability

### **Health Check**
Endpoint providing application status information for monitoring systems.

**Responses:**
- Database connectivity
- Memory usage
- System uptime
- External service status

### **Blue-Green Deployment**
Deployment strategy using two identical environments to enable zero-downtime updates.

**Process:**
1. Deploy to inactive environment (green)
2. Test new deployment
3. Switch traffic to green
4. Keep blue as rollback option

### **Horizontal Scaling**
Adding more server instances to handle increased load.

**Methods:**
- Container replication
- Load balancer distribution
- Auto-scaling based on metrics

---

## 📊 **Performance & Monitoring Terms**

### **Connection Pool**
Database pattern reusing connections to improve performance and resource management.

**Configuration:**
- `max`: Maximum connections
- `min`: Minimum connections
- `acquire`: Connection timeout
- `idle`: Idle timeout

### **Query Optimization**
Techniques for improving database query performance.

**Strategies:**
- Proper indexing
- Relation loading optimization
- Query result caching
- Pagination with `take` limits

### **APM (Application Performance Monitoring)**
System for tracking application performance, errors, and user experience.

**Metrics:**
- Response times
- Error rates
- Database performance
- Memory usage

---

## 🔧 **Development Terms**

### **Hot Reload**
Development feature that automatically restarts application when code changes.

**Command:** `npm run start:dev`

### **Migration**
Versioned database schema change that can be applied and rolled back.

**Workflow:**
1. Modify entities
2. Generate migration
3. Review generated SQL
4. Apply to database

### **Environment Configuration**
System for managing different settings across development, staging, and production.

**Files:**
- `.env.development`
- `.env.staging`
- `.env.production`

---

> **This glossary is a living document.** Add new terms as the project evolves and keep definitions current with implementation changes. When in doubt about terminology, refer to official NestJS, TypeORM, and PostgreSQL documentation. 