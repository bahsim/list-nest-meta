# Troubleshooting Guide

This document provides comprehensive troubleshooting guidance for common issues encountered when developing, testing, and deploying the WishListShare backend. It includes diagnostic steps, solutions, and prevention strategies.

---

## 🚨 **Quick Diagnostic Commands**

### **System Health Check**
```bash
# Check if all services are running
npm run health-check

# Database connection test
npm run db:check

# API endpoint validation
curl http://localhost:3000/health

# Check logs for errors
npm run logs:error

# Memory and CPU usage
npm run performance:check
```

### **Development Environment Status**
```bash
# Node.js version
node --version  # Should be 18+

# PostgreSQL status
pg_isready -h localhost -p 5432

# Environment variables
npm run env:validate

# Dependencies check
npm audit

# Port availability
lsof -i :3000
```

---

## 🔧 **Common Issues & Solutions**

### **Database Connection Problems**

#### **Issue: Connection Refused**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Diagnosis:**
```bash
# Check PostgreSQL status
brew services list | grep postgresql  # macOS
systemctl status postgresql           # Linux
sc query postgresql-x64-14           # Windows

# Test connection manually
psql -h localhost -p 5432 -U student -d nest_project
```

**Solutions:**
1. **Start PostgreSQL:**
   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   
   # Windows
   net start postgresql-x64-14
   ```

2. **Check credentials in `.env`:**
   ```bash
   DATABASE_URL=postgresql://student:student@localhost:5432/nest_project
   ```

3. **Create database if missing:**
   ```bash
   createdb nest_project
   ```

#### **Issue: Authentication Failed**
```
Error: password authentication failed for user "student"
```

**Solutions:**
1. **Reset PostgreSQL password:**
   ```bash
   # Connect as postgres user
   sudo -u postgres psql
   
   # Reset password
   ALTER USER student PASSWORD 'student';
   ```

2. **Check pg_hba.conf configuration:**
   ```bash
   # Find config file
   sudo find / -name pg_hba.conf 2>/dev/null
   
   # Ensure local connections use md5
   local   all             all                                     md5
   host    all             all             127.0.0.1/32            md5
   ```

### **JWT Authentication Issues**

#### **Issue: Invalid Token**
```
Error: JsonWebTokenError: invalid token
```

**Diagnosis:**
```bash
# Check token format
echo "YOUR_TOKEN" | cut -d'.' -f1 | base64 -d

# Verify JWT secret
echo $JWT_SECRET

# Test token generation
npm run jwt:test
```

**Solutions:**
1. **Verify JWT secret in environment:**
   ```bash
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

2. **Check token expiration:**
   ```typescript
   // Debug token payload
   const jwt = require('jsonwebtoken');
   const decoded = jwt.decode(token);
   console.log('Token payload:', decoded);
   console.log('Expires at:', new Date(decoded.exp * 1000));
   ```

3. **Generate new token:**
   ```bash
   curl -X POST http://localhost:3000/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"username":"your-username","password":"your-password"}'
   ```

### **Validation Errors**

#### **Issue: DTO Validation Failures**
```
Error: Bad Request - Validation failed
```

**Common DTO Issues:**
```typescript
// ❌ Wrong - Missing validation decorators
export class CreateWishDto {
  name: string;
  price: number;
}

// ✅ Correct - Proper validation
export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Math.round(Number(value) * 100) / 100)
  price: number;
}
```

**Debug validation:**
```typescript
// Add to main.ts for debugging
app.useGlobalPipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: false, // Set to false for debugging
}));
```

### **Business Logic Errors**

#### **Issue: Offer Amount Exceeds Wish Price**
```
Error: ForbiddenException: Offer amount exceeds available amount
```

**Debug steps:**
```typescript
// Check wish current state
const wish = await this.wishRepository.findOne({
  where: { id: wishId },
  relations: ['offers'],
});

console.log('Wish price:', wish.price);
console.log('Wish raised:', wish.raised);
console.log('Available amount:', wish.price - wish.raised);
console.log('Offer amount:', offerDto.amount);
```

**Solution:**
```typescript
// Proper validation in service
const availableAmount = wish.price - wish.raised;
if (offerDto.amount > availableAmount) {
  throw new ForbiddenException(
    `Offer amount (${offerDto.amount}) exceeds available amount (${availableAmount})`
  );
}
```

#### **Issue: Cannot Edit Wish with Offers**
```
Error: ForbiddenException: Cannot edit wish that has offers
```

**Prevention:**
```typescript
// Check offers before allowing edit
const wish = await this.wishRepository.findOne({
  where: { id },
  relations: ['offers'],
});

if (wish.offers && wish.offers.length > 0) {
  throw new ForbiddenException('Cannot edit wish that has offers');
}
```

---

## 🐛 **Debugging Techniques**

### **Database Query Debugging**
```typescript
// Enable TypeORM logging
// In app.module.ts
TypeOrmModule.forRoot({
  // ... other config
  logging: true,
  logger: 'advanced-console',
});

// Query debugging in service
console.log('Executing query:', query);
const result = await this.repository.find(query);
console.log('Query result count:', result.length);
```

### **Request/Response Debugging**
```typescript
// Add interceptor for debugging
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Request:', {
      method: request.method,
      url: request.url,
      body: request.body,
      headers: request.headers,
    });

    return next.handle().pipe(
      tap(data => console.log('Response:', data)),
    );
  }
}
```

### **Business Logic Debugging**
```typescript
// Service method debugging template
async someMethod(param: any) {
  console.log('Method entry:', { param });
  
  try {
    // Step 1: Validation
    console.log('Step 1: Validation');
    this.validateInput(param);
    
    // Step 2: Data retrieval
    console.log('Step 2: Data retrieval');
    const data = await this.repository.findOne(param.id);
    console.log('Retrieved data:', data);
    
    // Step 3: Business logic
    console.log('Step 3: Business logic');
    const result = this.processData(data);
    console.log('Processed result:', result);
    
    return result;
  } catch (error) {
    console.error('Method error:', error);
    throw error;
  }
}
```

---

## 🔍 **Performance Issues**

### **Slow Database Queries**

#### **Diagnosis:**
```sql
-- Enable query logging in PostgreSQL
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
WHERE mean_time > 1000
ORDER BY mean_time DESC;
```

#### **Solutions:**
1. **Add database indexes:**
   ```sql
   CREATE INDEX idx_wishes_owner_id ON wish(owner_id);
   CREATE INDEX idx_offers_wish_id ON offer(wish_id);
   CREATE INDEX idx_users_username ON user(username);
   CREATE INDEX idx_users_email ON user(email);
   ```

2. **Optimize TypeORM queries:**
   ```typescript
   // ❌ N+1 query problem
   const wishes = await this.wishRepository.find();
   for (const wish of wishes) {
     wish.owner = await this.userRepository.findOne(wish.ownerId);
   }

   // ✅ Efficient single query
   const wishes = await this.wishRepository.find({
     relations: ['owner'],
   });
   ```

3. **Use query builder for complex queries:**
   ```typescript
   const wishes = await this.wishRepository
     .createQueryBuilder('wish')
     .leftJoinAndSelect('wish.owner', 'owner')
     .leftJoinAndSelect('wish.offers', 'offers')
     .where('wish.price > :minPrice', { minPrice: 50 })
     .take(20)
     .getMany();
   ```

### **Memory Leaks**

#### **Diagnosis:**
```bash
# Monitor memory usage
npm install -g clinic
clinic doctor -- npm start

# Check for memory leaks
node --inspect server.js
# Open chrome://inspect in Chrome
```

#### **Common causes and solutions:**
1. **Unclosed database connections:**
   ```typescript
   // ❌ Wrong - connection leak
   const connection = await createConnection();
   // Missing: await connection.close();

   // ✅ Correct - proper cleanup
   try {
     const result = await this.repository.find();
     return result;
   } finally {
     // TypeORM handles connection pooling automatically
   }
   ```

2. **Event listener leaks:**
   ```typescript
   // ❌ Wrong - listener not removed
   process.on('uncaughtException', handler);

   // ✅ Correct - cleanup in onModuleDestroy
   @Injectable()
   export class SomeService implements OnModuleDestroy {
     onModuleDestroy() {
       process.removeListener('uncaughtException', this.handler);
     }
   }
   ```

---

## 🔒 **Security Issues**

### **SQL Injection Prevention**
```typescript
// ❌ Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE username = '${username}'`;

// ✅ Safe with parameterized queries
const user = await this.userRepository.findOne({
  where: { username },
});

// ✅ Safe with query builder
const user = await this.userRepository
  .createQueryBuilder('user')
  .where('user.username = :username', { username })
  .getOne();
```

### **Password Security Issues**
```typescript
// ❌ Plain text password storage
user.password = password;

// ✅ Proper password hashing
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
user.password = await bcrypt.hash(password, saltRounds);

// Verification
const isValid = await bcrypt.compare(password, user.password);
```

---

## 📊 **Monitoring & Alerting**

### **Application Metrics**
```typescript
// Health check endpoint
@Get('health')
async getHealth() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: await this.checkDatabase(),
    memory: process.memoryUsage(),
    uptime: process.uptime(),
  };
}

private async checkDatabase() {
  try {
    await this.userRepository.count();
    return { status: 'connected' };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}
```

### **Error Logging**
```typescript
// Structured logging
import { Logger } from '@nestjs/common';

@Injectable()
export class SomeService {
  private readonly logger = new Logger(SomeService.name);

  async someMethod() {
    try {
      // ... business logic
    } catch (error) {
      this.logger.error('Method failed', {
        error: error.message,
        stack: error.stack,
        context: { userId, timestamp: new Date() },
      });
      throw error;
    }
  }
}
```

---

## 🛠️ **Development Tools**

### **Useful Debug Scripts**
```bash
# package.json scripts
{
  "scripts": {
    "debug": "node --inspect-brk dist/main.js",
    "db:reset": "npm run migration:down && npm run migration:up",
    "logs:error": "grep -i error logs/*.log | tail -50",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "profile": "clinic doctor -- node dist/main.js"
  }
}
```

### **Database Debugging Queries**
```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE tablename IN ('user', 'wish', 'offer', 'wishlist');

-- Check index usage
SELECT 
  indexrelname,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes;

-- Active connections
SELECT 
  pid,
  state,
  query_start,
  query
FROM pg_stat_activity
WHERE state = 'active';
```

---

## 📋 **Troubleshooting Checklist**

### **Before Asking for Help**
- [ ] Check recent changes in git log
- [ ] Verify environment variables
- [ ] Check logs for error messages
- [ ] Test with minimal reproduction
- [ ] Confirm issue exists in clean environment

### **Information to Include**
- [ ] Error message and stack trace
- [ ] Steps to reproduce
- [ ] Environment details (OS, Node version)
- [ ] Recent changes or deployments
- [ ] Expected vs actual behavior

### **Common Resolution Steps**
- [ ] Restart development server
- [ ] Clear node_modules and reinstall
- [ ] Check database connectivity
- [ ] Verify environment configuration
- [ ] Test with different data

---

> **When in doubt, start with the basics:** Check that services are running, environment variables are set correctly, and the database is accessible. Most issues stem from configuration problems rather than code bugs. 