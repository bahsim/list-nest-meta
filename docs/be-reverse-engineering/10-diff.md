# Wishlists Module: Granular Comparison

## File Presence and Structure

| File/Folder                | Original                | Regenerated                | Notes                                  |
|----------------------------|-------------------------|----------------------------|----------------------------------------|
| wishlists.module.ts        | Present (14 lines)      | Present (13 lines)         | Both exist, but line count differs     |
| wishlists.controller.ts    | Present (66 lines)      | Present (34 lines)         | Both exist, regenerated is shorter     |
| wishlists.service.ts       | Present (74 lines)      | Present (35 lines)         | Both exist, regenerated is shorter     |
| entities/wishlist.entity.ts| Present (43 lines)      | Present (13 lines)         | Both exist, regenerated is much shorter|
| dto/create-wishlist.dto.ts | Present (26 lines)      | Present (10 lines)         | Both exist, regenerated is much shorter|
| dto/update-wishlist.dto.ts | Present (5 lines)       | Present (4 lines)          | Both exist, similar length             |
| wishlists.service.spec.ts  | Present                 | Missing                    | Test file missing in regen             |
| wishlists.controller.spec.ts| Present                | Missing                    | Test file missing in regen             |

## Key Inconsistencies and Gaps
- Regenerated files are significantly shorter, indicating missing logic or structure.
- Test files are missing in regen.
- Entity and DTO files in regen are much shorter, likely missing fields, decorators, or relations.
- Service and controller in regen are much shorter, likely missing business logic, error handling, or endpoints.
- Regenerated files likely lack comments or documentation.

## Categorization
- Critical: Missing test files, missing entity fields/validation.
- Major: Missing business logic, error handling, DTO validation.
- Minor: Lack of comments/documentation.

# Wishes Module: Granular Comparison

## File Presence and Structure

| File/Folder                | Original                | Regenerated                | Notes                                  |
|----------------------------|-------------------------|----------------------------|----------------------------------------|
| wishes.module.ts           | Present (14 lines)      | Present (14 lines)         | Both exist, similar length             |
| wishes.controller.ts       | Present (80 lines)      | Present (38 lines)         | Both exist, regenerated is shorter     |
| wishes.service.ts          | Present (158 lines)     | Present (35 lines)         | Both exist, regenerated is much shorter|
| entities/wish.entity.ts    | Present (66 lines)      | Present (13 lines)         | Both exist, regenerated is much shorter|
| dto/create-wish.dto.ts     | Present (24 lines)      | Present (10 lines)         | Both exist, regenerated is much shorter|
| dto/update-wish.dto.ts     | Present (28 lines)      | Present (4 lines)          | Both exist, regenerated is much shorter|
| guards/wish-owner.guard.ts | Present (23 lines)      | Present (9 lines)          | Both exist, regenerated is much shorter|

## Key Inconsistencies and Gaps
- Regenerated files are significantly shorter, indicating missing logic or structure.
- Entity and DTO files in regen are much shorter, likely missing fields, decorators, or relations.
- Service and controller in regen are much shorter, likely missing business logic, error handling, or endpoints.
- Guard in regen is much shorter, likely missing ownership logic.
- Regenerated files likely lack comments or documentation.

## Categorization
- Critical: Missing entity fields/validation, missing guard logic.
- Major: Missing business logic, error handling, DTO validation.
- Minor: Lack of comments/documentation.

# Users Module: Granular Comparison

## File Presence and Structure

| File/Folder                | Original                | Regenerated                | Notes                                  |
|----------------------------|-------------------------|----------------------------|----------------------------------------|
| users.module.ts            | Present (15 lines)      | Present (14 lines)         | Both exist, similar length             |
| users.controller.ts        | Present (70 lines)      | Present (43 lines)         | Both exist, regenerated is shorter     |
| users.service.ts           | Present (53 lines)      | Present (35 lines)         | Both exist, regenerated is shorter     |
| entities/user.entity.ts    | Present (55 lines)      | Present (13 lines)         | Both exist, regenerated is much shorter|
| dto/create-user.dto.ts     | Present (25 lines)      | Present (9 lines)          | Both exist, regenerated is much shorter|
| dto/update-user.dto.ts     | Present (22 lines)      | Present (4 lines)          | Both exist, regenerated is much shorter|

## Key Inconsistencies and Gaps
- Regenerated files are significantly shorter, indicating missing logic or structure.
- Entity and DTO files in regen are much shorter, likely missing fields, decorators, or relations.
- Service and controller in regen are much shorter, likely missing business logic, error handling, or endpoints.
- Regenerated files likely lack comments or documentation.

## Categorization
- Critical: Missing entity fields/validation.
- Major: Missing business logic, error handling, DTO validation.
- Minor: Lack of comments/documentation.

# Offers Module: Granular Comparison

## File Presence and Structure

| File/Folder                      | Original                | Regenerated                | Notes                                  |
|----------------------------------|-------------------------|----------------------------|----------------------------------------|
| offers.module.ts                 | Present (17 lines)      | Present (16 lines)         | Both exist, similar length             |
| offers.controller.ts             | Present (62 lines)      | Present (34 lines)         | Both exist, regenerated is shorter     |
| offers.service.ts                | Present (152 lines)     | Present (35 lines)         | Both exist, regenerated is much shorter|
| entities/offer.entity.ts         | Present (59 lines)      | Present (13 lines)         | Both exist, regenerated is much shorter|
| dto/create-offer.dto.ts          | Present (17 lines)      | Present (10 lines)         | Both exist, regenerated is shorter     |
| dto/update-offer.dto.ts          | Present (13 lines)      | Present (4 lines)          | Both exist, regenerated is shorter     |
| services/offers-repository.service.ts | Present (133 lines) | Present (6 lines)          | Both exist, regenerated is much shorter|
| services/offers-validation.service.ts | Present (52 lines)  | Present (7 lines)          | Both exist, regenerated is much shorter|

## Key Inconsistencies and Gaps
- Regenerated files are significantly shorter, indicating missing logic or structure.
- Entity and DTO files in regen are much shorter, likely missing fields, decorators, or relations.
- Service, controller, and additional services in regen are much shorter, likely missing business logic, error handling, or endpoints.
- Regenerated files likely lack comments or documentation.

## Categorization
- Critical: Missing entity fields/validation, missing repository/validation logic.
- Major: Missing business logic, error handling, DTO validation.
- Minor: Lack of comments/documentation.

# Auth Module: Granular Comparison

## File Presence and Structure

| File/Folder                | Original                | Regenerated                | Notes                                  |
|----------------------------|-------------------------|----------------------------|----------------------------------------|
| auth.module.ts             | Present (37 lines)      | Present (18 lines)         | Both exist, regenerated is much shorter|
| auth.controller.ts         | Present (26 lines)      | Present (15 lines)         | Both exist, regenerated is shorter     |
| auth.service.ts            | Present (67 lines)      | Present (6 lines)          | Both exist, regenerated is much shorter|
| guards/jwt-auth.guard.ts   | Present (6 lines)       | Present (6 lines)          | Both exist, similar length             |
| guards/local-auth.guard.ts | Present (10 lines)      | Present (6 lines)          | Both exist, regenerated is shorter     |
| guards/optional-jwt-auth.guard.ts | Present (10 lines) | Present (10 lines)        | Both exist, similar length             |
| strategies/local.strategy.ts | Present (22 lines)    | Present (15 lines)         | Both exist, regenerated is shorter     |
| strategies/jwt.strategy.ts | Present (18 lines)      | Present (19 lines)         | Both exist, similar length             |

## Key Inconsistencies and Gaps
- Regenerated files are significantly shorter, indicating missing logic or structure.
- Service and controller in regen are much shorter, likely missing authentication logic, error handling, or endpoints.
- Guards and strategies in regen are shorter, likely missing custom logic or configuration.
- Regenerated files likely lack comments or documentation.

## Categorization
- Critical: Missing authentication logic in service/controller.
- Major: Missing error handling, custom guard/strategy logic.
- Minor: Lack of comments/documentation.

# Config Module: Granular Comparison

## File Presence and Structure

| File/Folder         | Original                | Regenerated                | Notes                                  |
|---------------------|-------------------------|----------------------------|----------------------------------------|
| configuration.ts    | Present (7 lines)       | Missing                    | Present in original, missing in regen  |

## Key Inconsistencies and Gaps
- The entire config module is missing in the regenerated backend.
- Any configuration logic, environment setup, or shared settings are not present in regen.

## Categorization
- Critical: Missing configuration logic and environment setup.

## Consolidated Actionable Recommendations

### Wishlists Module
- Extend pattern library for test file generation, advanced entity/DTO fields, and validation decorators.
- Manually port business logic, error handling, and custom endpoints from original to regen.
- Enhance extraction/mapping logic to capture all fields, decorators, and business logic in entities, DTOs, services, and controllers.

### Wishes Module
- Extend pattern library for advanced entity/DTO fields, validation decorators, and guard logic.
- Manually port business logic, error handling, custom endpoints, and guard logic from original to regen.
- Enhance extraction/mapping logic to capture all fields, decorators, business logic, and guard logic in entities, DTOs, services, controllers, and guards.

### Users Module
- Extend pattern library for advanced entity/DTO fields and validation decorators.
- Manually port business logic, error handling, and custom endpoints from original to regen.
- Enhance extraction/mapping logic to capture all fields, decorators, and business logic in entities, DTOs, services, and controllers.

### Offers Module
- Extend pattern library for advanced entity/DTO fields, validation decorators, and repository/validation service logic.
- Manually port business logic, error handling, custom endpoints, and repository/validation logic from original to regen.
- Enhance extraction/mapping logic to capture all fields, decorators, business logic, and repository/validation logic in entities, DTOs, services, controllers, and services.

### Auth Module
- Extend pattern library for authentication logic, error handling, and custom guard/strategy logic.
- Manually port authentication logic, error handling, and custom guard/strategy logic from original to regen.
- Enhance extraction/mapping logic to capture all authentication, error handling, and custom logic in services, controllers, guards, and strategies.

### Config Module
- Extend pattern library to support configuration modules and environment setup.
- Manually port configuration logic and shared settings from original to regen.
- Enhance extraction/mapping logic to detect and generate configuration files and modules.

<!-- Add recommendations for other modules below as comparison proceeds --> 