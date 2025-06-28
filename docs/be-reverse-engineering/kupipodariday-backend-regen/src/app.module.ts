import { Module } from '@nestjs/common';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishesModule } from './wishes/wishes.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WishlistsModule, WishesModule, UsersModule, OffersModule, AuthModule],
})
export class AppModule {} 