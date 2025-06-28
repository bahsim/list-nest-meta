# Domain Model Definitions and Relationships

## User
- Fields: id, createdAt, updatedAt, username, about, avatar, email, password
- Relationships:
  - wishes: Wish[] (@OneToMany)
  - offers: Offer[] (@OneToMany)
  - wishlists: Wishlist[] (@OneToMany)
- Validation: @Length, @IsEmail, @Exclude (password)
- Notes: User is the owner of wishes, offers, and wishlists.

## Wish
- Fields: id, createdAt, updatedAt, name, link, image, price, raised, description, copied
- Relationships:
  - owner: User (@ManyToOne)
  - wishlists: Wishlist[] (@ManyToMany)
  - offers: Offer[] (@OneToMany)
- Validation: @Length, @IsUrl, @Min, @Transform
- Notes: Wish belongs to a user, can be in multiple wishlists, and can have multiple offers.

## Wishlist
- Fields: id, createdAt, updatedAt, name, description, image
- Relationships:
  - items: Wish[] (@ManyToMany)
  - owner: User (@ManyToOne)
- Validation: @Length, @IsUrl
- Notes: Wishlist is owned by a user and contains multiple wishes.

## Offer
- Fields: id, createdAt, updatedAt, item, amount, hidden
- Relationships:
  - user: User (@ManyToOne)
  - wish: Wish (@ManyToOne)
- Validation: @IsUrl, @Min, @Transform
- Notes: Offer is made by a user for a wish. 