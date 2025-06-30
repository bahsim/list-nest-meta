# Detailed Backend Inventory

## wishlists
### entities
- wishlist.entity.ts
### dto
- create-wishlist.dto.ts
- update-wishlist.dto.ts

## wishes
### entities
- wish.entity.ts
### dto
- update-wish.dto.ts
- create-wish.dto.ts
### guards
- wish-owner.guard.ts

## users
### entities
- user.entity.ts
### dto
- create-user.dto.ts
- update-user.dto.ts

## offers
### entities
- offer.entity.ts
### dto
- create-offer.dto.ts
- update-offer.dto.ts
### services
- offers.service.ts
- offers-repository.service.ts
- offers-validation.service.ts

## auth
### guards
- optional-jwt-auth.guard.ts
- jwt-auth.guard.ts
- local-auth.guard.ts
### strategies
- local.strategy.ts
- jwt.strategy.ts 