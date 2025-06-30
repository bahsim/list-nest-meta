# Domain Models: Properties and Relationships

This document summarizes the main properties and relationships for the core domain models in the original backend. Each section outlines the entity's fields, types, constraints, and associations.

---

## User

**Properties:**
- `id`: number (Primary key)
- `createdAt`: Date (Auto-generated)
- `updatedAt`: Date (Auto-generated)
- `username`: string (Unique, required, 2-30 chars)
- `about`: string (Optional, 2-200 chars)
- `avatar`: string (Optional, default URL)
- `email`: string (Unique, required, email format)
- `password`: string (Required, excluded from serialization)

**Relationships:**
- `wishes`: One-to-many with Wish (User owns many Wishes)
- `offers`: One-to-many with Offer (User makes many Offers)
- `wishlists`: One-to-many with Wishlist (User owns many Wishlists)

---

## Wish

**Properties:**
- `id`: number (Primary key)
- `createdAt`: Date (Auto-generated)
- `updatedAt`: Date (Auto-generated)
- `name`: string (Required, 1-250 chars)
- `link`: string (Required, URL)
- `image`: string (Required, URL)
- `price`: number (Required, min 1, rounded to 2 decimals)
- `raised`: number (Required, min 0, rounded to 2 decimals)
- `description`: string (Required, 1-1024 chars)
- `copied`: number (Default 0)

**Relationships:**
- `owner`: Many-to-one with User (Wish is owned by a User)
- `wishlists`: Many-to-many with Wishlist (Wish can belong to many Wishlists)
- `offers`: One-to-many with Offer (Wish can have many Offers)

---

## Wishlist

**Properties:**
- `id`: number (Primary key)
- `createdAt`: Date (Auto-generated)
- `updatedAt`: Date (Auto-generated)
- `name`: string (Required, 1-250 chars)
- `description`: string (Optional, 1-1024 chars)
- `image`: string (Required, URL)

**Relationships:**
- `items`: Many-to-many with Wish (Wishlist contains many Wishes)
- `owner`: Many-to-one with User (Wishlist is owned by a User)

---

## Offer

**Properties:**
- `id`: number (Primary key)
- `createdAt`: Date (Auto-generated)
- `updatedAt`: Date (Auto-generated)
- `item`: string (Required, URL)
- `amount`: number (Required, min 1, rounded to 2 decimals)
- `hidden`: boolean (Default false)

**Relationships:**
- `user`: Many-to-one with User (Offer is made by a User)
- `wish`: Many-to-one with Wish (Offer is for a Wish)

---

## General Patterns

- **Validation:** Uses class-validator decorators for field constraints (length, email, URL, min value).
- **Timestamps:** All entities have `createdAt` and `updatedAt` fields managed by TypeORM.
- **Relationships:** Associations are explicitly defined using TypeORM decorators (one-to-many, many-to-one, many-to-many). 