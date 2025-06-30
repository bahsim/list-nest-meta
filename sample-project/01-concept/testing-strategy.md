# Testing Strategy & Implementation Guide

This document outlines the comprehensive testing approach for the WishListShare backend, including unit tests, integration tests, end-to-end tests, testing patterns, and specific examples aligned with the system's architecture and business rules.

---

## 🎯 **Testing Philosophy & Strategy**

### **Testing Pyramid**
```mermaid
graph TD
    A[E2E Tests<br/>10% - Browser automation, API flows] --> B[Integration Tests<br/>30% - Service + Database]
    B --> C[Unit Tests<br/>60% - Pure functions, mocked dependencies]
    
    style A fill:#ff6b6b,color:#000
    style B fill:#4ecdc4,color:#000
    style C fill:#45b7d1,color:#000
```

### **Coverage Targets**
- **Unit Tests:** 80%+ coverage of business logic
- **Integration Tests:** All service-database interactions
- **E2E Tests:** Critical user journeys and business flows
- **Contract Tests:** API endpoint contracts

---

## 🧪 **Unit Testing**

### **Testing Configuration**
```typescript
// jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.interface.ts',
    '!**/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### **Service Unit Testing Patterns**

#### **WishesService Example**
```typescript
// wishes/wishes.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';
import { CreateWishDto } from './dto/create-wish.dto';

// Mock repository type
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('WishesService', () => {
  let service: WishesService;
  let mockWishRepository: MockRepository<Wish>;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    about: 'Test user',
    avatar: 'https://example.com/avatar.jpg',
    wishes: [],
    offers: [],
    wishlists: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockWish: Wish = {
    id: 1,
    name: 'Test Wish',
    description: 'A test wish',
    price: 100.00,
    raised: 0,
    copied: 0,
    link: 'https://example.com/item',
    image: 'https://example.com/image.jpg',
    owner: mockUser,
    offers: [],
    wishlists: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      manager: {
        transaction: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishesService,
        {
          provide: getRepositoryToken(Wish),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WishesService>(WishesService);
    mockWishRepository = module.get<MockRepository<Wish>>(getRepositoryToken(Wish));
  });

  describe('create', () => {
    it('should create a wish successfully', async () => {
      // Arrange
      const createWishDto: CreateWishDto = {
        name: 'New Wish',
        description: 'A new wish',
        price: 50.00,
        link: 'https://example.com/new-item',
        image: 'https://example.com/new-image.jpg',
      };

      const expectedWish = {
        ...createWishDto,
        id: 2,
        raised: 0,
        copied: 0,
        owner: mockUser,
        offers: [],
        wishlists: [],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockWishRepository.create.mockReturnValue(expectedWish);
      mockWishRepository.save.mockResolvedValue(expectedWish);

      // Act
      const result = await service.create(createWishDto, mockUser);

      // Assert
      expect(mockWishRepository.create).toHaveBeenCalledWith({
        ...createWishDto,
        owner: mockUser,
        copied: 0,
        raised: 0,
      });
      expect(mockWishRepository.save).toHaveBeenCalledWith(expectedWish);
      expect(result).toEqual(expectedWish);
    });

    it('should handle creation errors', async () => {
      // Arrange
      const createWishDto: CreateWishDto = {
        name: 'New Wish',
        description: 'A new wish',
        price: 50.00,
        link: 'https://example.com/new-item',
        image: 'https://example.com/new-image.jpg',
      };

      mockWishRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.create(createWishDto, mockUser)).rejects.toThrow('Database error');
    });
  });

  describe('update', () => {
    it('should update own wish successfully', async () => {
      // Arrange
      const updateDto = { name: 'Updated Wish' };
      const wishWithOwner = { ...mockWish, owner: mockUser, offers: [] };
      
      mockWishRepository.findOne.mockResolvedValue(wishWithOwner);
      mockWishRepository.update.mockResolvedValue({ affected: 1 });

      // Act
      const result = await service.update(1, updateDto, mockUser.id);

      // Assert
      expect(mockWishRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['owner', 'offers'],
      });
      expect(mockWishRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw NotFoundException for non-existent wish', async () => {
      // Arrange
      mockWishRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(999, { name: 'Updated' }, mockUser.id))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException for non-owner update', async () => {
      // Arrange
      const otherUser = { ...mockUser, id: 2 };
      const wishWithOwner = { ...mockWish, owner: otherUser, offers: [] };
      
      mockWishRepository.findOne.mockResolvedValue(wishWithOwner);

      // Act & Assert
      await expect(service.update(1, { name: 'Updated' }, mockUser.id))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when wish has offers', async () => {
      // Arrange
      const wishWithOffers = { 
        ...mockWish, 
        owner: mockUser, 
        offers: [{ id: 1, amount: 25.00 }] 
      };
      
      mockWishRepository.findOne.mockResolvedValue(wishWithOffers);

      // Act & Assert
      await expect(service.update(1, { name: 'Updated' }, mockUser.id))
        .rejects.toThrow(ForbiddenException);
    });
  });

  describe('copyWish', () => {
    it('should copy wish successfully with transaction', async () => {
      // Arrange
      const copiedWish = {
        ...mockWish,
        id: 2,
        copied: 0,
        raised: 0,
        owner: mockUser,
        offers: [],
      };

      mockWishRepository.findOne.mockResolvedValue(mockWish);
      mockWishRepository.create.mockReturnValue(copiedWish);
      mockWishRepository.save.mockResolvedValue(copiedWish);
      
      const mockTransaction = jest.fn().mockImplementation(async (callback) => {
        const mockManager = {
          update: jest.fn().mockResolvedValue({ affected: 1 }),
        };
        return callback(mockManager);
      });
      
      mockWishRepository.manager.transaction = mockTransaction;

      // Act
      const result = await service.copyWish(1, mockUser);

      // Assert
      expect(mockWishRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['owner'],
      });
      expect(mockTransaction).toHaveBeenCalled();
      expect(result).toEqual(copiedWish);
    });
  });
});
```

### **Controller Unit Testing**
```typescript
// wishes/wishes.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';

describe('WishesController', () => {
  let controller: WishesController;
  let mockWishesService: Partial<WishesService>;

  beforeEach(async () => {
    mockWishesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      copyWish: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishesController],
      providers: [
        {
          provide: WishesService,
          useValue: mockWishesService,
        },
      ],
    }).compile();

    controller = module.get<WishesController>(WishesController);
  });

  it('should create a wish', async () => {
    // Arrange
    const createWishDto: CreateWishDto = {
      name: 'Test Wish',
      description: 'A test wish',
      price: 100.00,
      link: 'https://example.com/item',
      image: 'https://example.com/image.jpg',
    };
    
    const mockUser = { id: 1, username: 'testuser' };
    const expectedWish = { id: 1, ...createWishDto, owner: mockUser };
    
    (mockWishesService.create as jest.Mock).mockResolvedValue(expectedWish);

    // Act
    const result = await controller.create(createWishDto, { user: mockUser });

    // Assert
    expect(mockWishesService.create).toHaveBeenCalledWith(createWishDto, mockUser);
    expect(result).toEqual(expectedWish);
  });
});
```

---

## 🔗 **Integration Testing**

### **Database Integration Tests**
```typescript
// test/integration/wishes.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { WishesService } from '../../src/wishes/wishes.service';
import { Wish } from '../../src/wishes/entities/wish.entity';
import { User } from '../../src/users/entities/user.entity';

describe('WishesService Integration', () => {
  let service: WishesService;
  let wishRepository: Repository<Wish>;
  let userRepository: Repository<User>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Wish, User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Wish, User]),
      ],
      providers: [WishesService],
    }).compile();

    service = module.get<WishesService>(WishesService);
    wishRepository = module.get<Repository<Wish>>(getRepositoryToken(Wish));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    await wishRepository.clear();
    await userRepository.clear();
  });

  it('should create and retrieve a wish', async () => {
    // Arrange
    const user = userRepository.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    await userRepository.save(user);

    const createWishDto = {
      name: 'Integration Test Wish',
      description: 'A wish for integration testing',
      price: 150.00,
      link: 'https://example.com/item',
      image: 'https://example.com/image.jpg',
    };

    // Act
    const createdWish = await service.create(createWishDto, user);
    const retrievedWish = await service.findOne(createdWish.id);

    // Assert
    expect(retrievedWish).toBeDefined();
    expect(retrievedWish.name).toBe(createWishDto.name);
    expect(retrievedWish.price).toBe(createWishDto.price);
    expect(retrievedWish.owner.id).toBe(user.id);
    expect(retrievedWish.copied).toBe(0);
    expect(retrievedWish.raised).toBe(0);
  });

  it('should handle wish copying with transaction', async () => {
    // Arrange
    const originalOwner = userRepository.create({
      username: 'original',
      email: 'original@example.com',
      password: 'password',
    });
    await userRepository.save(originalOwner);

    const copyingUser = userRepository.create({
      username: 'copier',
      email: 'copier@example.com',
      password: 'password',
    });
    await userRepository.save(copyingUser);

    const originalWish = await service.create({
      name: 'Original Wish',
      description: 'Original description',
      price: 200.00,
      link: 'https://example.com/original',
      image: 'https://example.com/original.jpg',
    }, originalOwner);

    // Act
    const copiedWish = await service.copyWish(originalWish.id, copyingUser);
    const updatedOriginal = await service.findOne(originalWish.id);

    // Assert
    expect(copiedWish.name).toBe(originalWish.name);
    expect(copiedWish.owner.id).toBe(copyingUser.id);
    expect(copiedWish.copied).toBe(0);
    expect(copiedWish.raised).toBe(0);
    expect(updatedOriginal.copied).toBe(1);
  });
});
```

---

## 🌐 **End-to-End Testing**

### **API E2E Testing**
```typescript
// test/e2e/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';

describe('WishListShare E2E', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication Flow', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'e2euser',
          email: 'e2e@example.com',
          password: 'password123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          authToken = res.body.access_token;
        });
    });

    it('should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          username: 'e2euser',
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
        });
    });
  });

  describe('Wishes CRUD Flow', () => {
    let wishId: number;

    it('should create a new wish', () => {
      return request(app.getHttpServer())
        .post('/wishes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'E2E Test Wish',
          description: 'A wish created in E2E test',
          price: 99.99,
          link: 'https://example.com/e2e-item',
          image: 'https://example.com/e2e-image.jpg',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('E2E Test Wish');
          expect(res.body.price).toBe(99.99);
          expect(res.body.copied).toBe(0);
          expect(res.body.raised).toBe(0);
          wishId = res.body.id;
        });
    });

    it('should retrieve the created wish', () => {
      return request(app.getHttpServer())
        .get(`/wishes/${wishId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(wishId);
          expect(res.body.name).toBe('E2E Test Wish');
        });
    });

    it('should update own wish', () => {
      return request(app.getHttpServer())
        .patch(`/wishes/${wishId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated E2E Wish',
        })
        .expect(200);
    });

    it('should copy wish', () => {
      return request(app.getHttpServer())
        .post(`/wishes/${wishId}/copy`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        .expect((res) => {
          expect(res.body.name).toBe('Updated E2E Wish');
          expect(res.body.copied).toBe(0);
          expect(res.body.id).not.toBe(wishId);
        });
    });
  });

  describe('Offer Flow', () => {
    let secondUserToken: string;
    let testWishId: number;

    beforeAll(async () => {
      // Create second user
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'seconduser',
          email: 'second@example.com',
          password: 'password123',
        });
      secondUserToken = response.body.access_token;

      // Create wish by first user
      const wishResponse = await request(app.getHttpServer())
        .post('/wishes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Wish for Offers',
          description: 'A wish to receive offers',
          price: 100.00,
          link: 'https://example.com/offer-item',
          image: 'https://example.com/offer-image.jpg',
        });
      testWishId = wishResponse.body.id;
    });

    it('should create an offer on another users wish', () => {
      return request(app.getHttpServer())
        .post('/offers')
        .set('Authorization', `Bearer ${secondUserToken}`)
        .send({
          amount: 25.00,
          hidden: false,
          item: testWishId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.amount).toBe(25.00);
          expect(res.body.hidden).toBe(false);
        });
    });

    it('should not allow offer on own wish', () => {
      return request(app.getHttpServer())
        .post('/offers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: 30.00,
          hidden: false,
          item: testWishId,
        })
        .expect(403);
    });

    it('should not allow offer exceeding wish price', () => {
      return request(app.getHttpServer())
        .post('/offers')
        .set('Authorization', `Bearer ${secondUserToken}`)
        .send({
          amount: 150.00, // Exceeds wish price of 100.00
          hidden: false,
          item: testWishId,
        })
        .expect(403);
    });
  });
});
```

---

## 🏗️ **Testing Utilities & Helpers**

### **Test Data Factories**
```typescript
// test/factories/user.factory.ts
import { User } from '../../src/users/entities/user.entity';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    return {
      id: Math.floor(Math.random() * 1000),
      username: `user${Math.random().toString(36).substr(2, 9)}`,
      email: `test${Math.random().toString(36).substr(2, 9)}@example.com`,
      password: 'hashedpassword',
      about: 'Test user description',
      avatar: 'https://i.pravatar.cc/300',
      wishes: [],
      offers: [],
      wishlists: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  static createMany(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
```

### **Custom Jest Matchers**
```typescript
// test/matchers/custom-matchers.ts
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidWish(): R;
      toHaveMonetaryPrecision(): R;
    }
  }
}

expect.extend({
  toBeValidWish(received) {
    const pass = 
      received &&
      typeof received.id === 'number' &&
      typeof received.name === 'string' &&
      typeof received.price === 'number' &&
      received.price > 0 &&
      typeof received.raised === 'number' &&
      received.raised >= 0 &&
      typeof received.copied === 'number' &&
      received.copied >= 0;

    return {
      message: () =>
        pass
          ? `Expected ${received} not to be a valid wish`
          : `Expected ${received} to be a valid wish with required fields`,
      pass,
    };
  },

  toHaveMonetaryPrecision(received) {
    const pass = Number.isFinite(received) && 
                 Number(received.toFixed(2)) === received;

    return {
      message: () =>
        pass
          ? `Expected ${received} not to have monetary precision`
          : `Expected ${received} to have exactly 2 decimal places`,
      pass,
    };
  },
});
```

---

## 📊 **Test Coverage & Quality**

### **Coverage Reports**
```bash
# Generate coverage report
npm run test:cov

# Coverage by file type
npm run test:cov -- --collectCoverageFrom="**/*.service.ts"
npm run test:cov -- --collectCoverageFrom="**/*.controller.ts"

# Watch mode with coverage
npm run test:cov -- --watch
```

### **Quality Gates**
```typescript
// jest.config.js - Quality gates
module.exports = {
  // ... other config
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/wishes/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/offers/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
```

---

## 🚀 **CI/CD Integration**

### **GitHub Actions Testing**
```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:cov
    
    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Run E2E tests
      run: npm run test:e2e
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

---

## 📋 **Testing Checklist**

### **Before Writing Tests**
- [ ] Understand the business requirement
- [ ] Identify edge cases and error scenarios
- [ ] Plan test data and mocking strategy
- [ ] Consider performance implications

### **Writing Quality Tests**
- [ ] Follow Arrange-Act-Assert pattern
- [ ] Use descriptive test names
- [ ] Test both happy path and error cases
- [ ] Mock external dependencies
- [ ] Avoid test interdependencies

### **Test Maintenance**
- [ ] Keep tests simple and focused
- [ ] Update tests when business logic changes
- [ ] Remove obsolete tests
- [ ] Regularly review test coverage
- [ ] Refactor duplicated test code

---

> **Testing is not just about code coverage.** Focus on testing business logic, edge cases, and user scenarios that matter. Good tests serve as documentation and enable confident refactoring. 