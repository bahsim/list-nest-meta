 import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OffersRepositoryService } from './services/offers-repository.service';
import { OffersValidationService } from './services/offers-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService, OffersRepositoryService, OffersValidationService],
  exports: [OffersService],
})
export class OffersModule {}
