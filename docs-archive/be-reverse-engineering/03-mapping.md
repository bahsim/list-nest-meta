# Backend Feature to Instruction Mapping

## wishlists
- wishlist.entity.ts: mid-level instruction (scaffold_nestjs_module: Wishlist)
- wishlists.controller.ts: mid-level instruction (add_crud_endpoints: Wishlist)
- wishlists.service.ts: mid-level instruction (implement_service_logic: Wishlist)
- create-wishlist.dto.ts: mid-level instruction (add_dto: CreateWishlistDto)
- update-wishlist.dto.ts: mid-level instruction (add_dto: UpdateWishlistDto)

## wishes
- wish.entity.ts: mid-level instruction (scaffold_nestjs_module: Wish)
- wishes.controller.ts: mid-level instruction (add_crud_endpoints: Wish)
- wishes.service.ts: mid-level instruction (implement_service_logic: Wish)
- create-wish.dto.ts: mid-level instruction (add_dto: CreateWishDto)
- update-wish.dto.ts: mid-level instruction (add_dto: UpdateWishDto)
- wish-owner.guard.ts: mid-level instruction (implement_guard: WishOwnerGuard)

## users
- user.entity.ts: mid-level instruction (scaffold_nestjs_module: User)
- users.controller.ts: mid-level instruction (add_crud_endpoints: User)
- users.service.ts: mid-level instruction (implement_service_logic: User)
- create-user.dto.ts: mid-level instruction (add_dto: CreateUserDto)
- update-user.dto.ts: mid-level instruction (add_dto: UpdateUserDto)

## offers
- offer.entity.ts: mid-level instruction (scaffold_nestjs_module: Offer)
- offers.controller.ts: mid-level instruction (add_crud_endpoints: Offer)
- offers.service.ts: mid-level instruction (implement_service_logic: Offer)
- offers-repository.service.ts: mid-level instruction (implement_repository: Offer)
- offers-validation.service.ts: mid-level instruction (implement_validation_service: Offer)
- create-offer.dto.ts: mid-level instruction (add_dto: CreateOfferDto)
- update-offer.dto.ts: mid-level instruction (add_dto: UpdateOfferDto)

## auth
- auth.service.ts: mid-level instruction (implement_auth_service)
- auth.controller.ts: mid-level instruction (add_auth_endpoints)
- optional-jwt-auth.guard.ts: mid-level instruction (implement_guard: OptionalJwtAuthGuard)
- jwt-auth.guard.ts: mid-level instruction (implement_guard: JwtAuthGuard)
- local-auth.guard.ts: mid-level instruction (implement_guard: LocalAuthGuard)
- local.strategy.ts: mid-level instruction (implement_strategy: LocalStrategy)
- jwt.strategy.ts: mid-level instruction (implement_strategy: JwtStrategy) 