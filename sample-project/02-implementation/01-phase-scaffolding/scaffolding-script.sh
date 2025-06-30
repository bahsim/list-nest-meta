#!/bin/bash

# WishListShare Scaffolding Phase
# Creates foundation for NestJS backend generation

set -e  # Exit on any error

echo "🏗️ WishListShare Scaffolding Phase"
echo "================================="

# Project creation
echo "📁 Creating NestJS project..."
nest new wishlistshare-api --package-manager npm
cd wishlistshare-api

echo "📦 Installing dependencies..."
npm install @nestjs/typeorm typeorm pg bcrypt @nestjs/passport passport passport-local passport-jwt @nestjs/jwt class-validator class-transformer @nestjs/config @nestjs/swagger swagger-ui-express

echo "🔧 Installing dev dependencies..."
npm install --save-dev @types/bcrypt @types/passport-local @types/passport-jwt

echo "🏗️ Generating modules..."
nest generate module config
nest generate module auth
nest generate module users
nest generate module wishes
nest generate module wishlists
nest generate module offers

echo "⚙️ Generating resources..."
nest generate resource auth --no-spec
nest generate resource users --no-spec
nest generate resource wishes --no-spec
nest generate resource wishlists --no-spec
nest generate resource offers --no-spec

echo ""
echo "✅ Scaffolding Complete"
echo ""
echo "🎯 What's Next:"
echo "Use platform-configuration.ts to generate:"
echo "  → Entities with TypeORM decorators"
echo "  → DTOs with validation rules"  
echo "  → Services with business logic"
echo "  → Authentication strategies"
echo "  → Guards and controllers"
echo ""
echo "This requires human-AI collaboration to build working software."

echo ""
echo "🔍 Validate scaffolding:"
echo "npm run start:dev  # Should start without errors"
echo "curl http://localhost:3000/api  # Should show Swagger" 