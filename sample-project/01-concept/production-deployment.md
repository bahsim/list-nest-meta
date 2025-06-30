# Production Deployment Guide

This document provides comprehensive guidance for deploying the WishListShare backend to production environments, including containerization, environment configuration, scaling strategies, monitoring, and security considerations.

---

## 🐳 **Docker Containerization**

### **Dockerfile**
```dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nestjs:nodejs . .

# Build application
RUN npm run build

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]
```

### **Docker Compose for Production**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: unless-stopped
    
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

---

## ⚙️ **Environment Configuration**

### **Production Environment Variables**
```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/wishlistshare_prod
POSTGRES_DB=wishlistshare_prod
POSTGRES_USER=wishlistshare_user
POSTGRES_PASSWORD=secure_password_here

# Application Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=very_secure_jwt_secret_with_256_bits
JWT_EXPIRES_IN=24h

# Redis Configuration (for caching)
REDIS_URL=redis://localhost:6379

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project

# Email (for notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@wishlistshare.com
SMTP_PASS=smtp_password
```

### **Environment Validation**
```typescript
// src/config/env.validation.ts
import { plainToClass, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  REDIS_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
```

---

## 🚀 **Deployment Strategies**

### **Blue-Green Deployment**
```bash
#!/bin/bash
# deploy.sh - Blue-Green deployment script

set -e

# Configuration
BLUE_CONTAINER="wishlistshare-blue"
GREEN_CONTAINER="wishlistshare-green"
NGINX_CONFIG="/etc/nginx/sites-available/wishlistshare"

# Determine current active container
CURRENT=$(docker ps --filter "name=wishlistshare-" --format "{{.Names}}" | grep -E "(blue|green)")

if [ "$CURRENT" = "$BLUE_CONTAINER" ]; then
    NEW_CONTAINER=$GREEN_CONTAINER
    NEW_COLOR="green"
    OLD_COLOR="blue"
else
    NEW_CONTAINER=$BLUE_CONTAINER
    NEW_COLOR="blue"
    OLD_COLOR="green"
fi

echo "Deploying to $NEW_COLOR environment..."

# Build and start new container
docker build -t wishlistshare:$NEW_COLOR .
docker run -d --name $NEW_CONTAINER \
    --env-file .env.production \
    -p 300${NEW_COLOR:0:1}:3000 \
    wishlistshare:$NEW_COLOR

# Health check
echo "Performing health check..."
sleep 10
if curl -f http://localhost:300${NEW_COLOR:0:1}/health; then
    echo "Health check passed"
else
    echo "Health check failed"
    docker stop $NEW_CONTAINER
    docker rm $NEW_CONTAINER
    exit 1
fi

# Switch nginx to new container
sed -i "s/300${OLD_COLOR:0:1}/300${NEW_COLOR:0:1}/g" $NGINX_CONFIG
nginx -s reload

# Stop old container
echo "Stopping old container..."
docker stop ${OLD_COLOR}
docker rm ${OLD_COLOR}

echo "Deployment to $NEW_COLOR completed successfully"
```

### **Rolling Updates with Kubernetes**
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wishlistshare-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: wishlistshare-backend
  template:
    metadata:
      labels:
        app: wishlistshare-backend
    spec:
      containers:
      - name: backend
        image: wishlistshare:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📊 **Monitoring & Observability**

### **Health Check Endpoints**
```typescript
// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      // Add Redis, external APIs, etc.
    ]);
  }
}
```

### **Application Metrics**
```typescript
// src/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { register, Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly httpRequests = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
  });

  private readonly httpDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route'],
  });

  incrementHttpRequests(method: string, route: string, statusCode: number) {
    this.httpRequests.inc({ method, route, status_code: statusCode });
  }

  observeHttpDuration(method: string, route: string, duration: number) {
    this.httpDuration.observe({ method, route }, duration);
  }

  getMetrics() {
    return register.metrics();
  }
}
```

### **Logging Configuration**
```typescript
// src/config/logger.config.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig = WinstonModule.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});
```

---

## 🛡️ **Security Hardening**

### **Security Headers**
```typescript
// src/main.ts security configuration
import helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // Compression
  app.use(compression());
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP',
  }));
  
  // CORS configuration
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3000);
}
```

### **Database Security**
```typescript
// Database configuration with security
export const databaseConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Always false in production
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
  logging: process.env.NODE_ENV !== 'production',
  // Connection pooling
  extra: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
};
```

---

## 📈 **Scaling Strategies**

### **Horizontal Scaling**
```yaml
# Auto-scaling configuration
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: wishlistshare-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: wishlistshare-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### **Database Scaling**
```typescript
// Read replica configuration
const primaryDataSource = new DataSource({
  // Primary database config
  type: 'postgres',
  url: process.env.PRIMARY_DATABASE_URL,
  // ... other config
});

const readReplicaDataSource = new DataSource({
  // Read replica config
  type: 'postgres',
  url: process.env.READ_REPLICA_DATABASE_URL,
  // ... other config
});

// Service implementation
@Injectable()
export class OptimizedWishesService {
  async findMany(query: FindManyOptions<Wish>) {
    // Use read replica for read operations
    return this.readReplicaRepository.find(query);
  }

  async create(data: CreateWishDto) {
    // Use primary for write operations
    return this.primaryRepository.save(data);
  }
}
```

---

## 🔄 **Database Migrations**

### **Migration Strategy**
```bash
# Production migration workflow
#!/bin/bash

# 1. Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Run migrations
npm run migration:run

# 3. Verify migration success
npm run migration:show

# 4. If rollback needed
npm run migration:revert
```

### **Migration Best Practices**
```typescript
// Example migration with proper rollback
import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class AddUserPreferences1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_preferences',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'email_notifications',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'user_preferences',
      new Index('IDX_USER_PREFERENCES_USER_ID', ['user_id']),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_preferences');
  }
}
```

---

## 📋 **Production Checklist**

### **Pre-Deployment**
- [ ] All environment variables configured and validated
- [ ] Database migrations tested and ready
- [ ] Security headers and rate limiting configured
- [ ] SSL certificates installed and configured
- [ ] Health check endpoints implemented
- [ ] Monitoring and logging configured
- [ ] Backup strategy implemented
- [ ] Load testing completed

### **Post-Deployment**
- [ ] Health checks passing
- [ ] Metrics and logs flowing correctly
- [ ] Database connections stable
- [ ] API endpoints responding correctly
- [ ] SSL certificate valid
- [ ] Rate limiting functioning
- [ ] Backup verification completed
- [ ] Monitoring alerts configured

### **Ongoing Maintenance**
- [ ] Regular security updates
- [ ] Database performance monitoring
- [ ] Log analysis and alerting
- [ ] Backup testing and rotation
- [ ] Capacity planning reviews
- [ ] Security vulnerability scanning

---

> **Production deployment requires careful planning and testing.** Always test deployment procedures in staging environments that mirror production before deploying to live systems. 