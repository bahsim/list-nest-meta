import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create(createOfferDto);
    return this.offerRepository.save(offer);
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneBy({ id });
  }

  update(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    return this.offerRepository.save({ ...updateOfferDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }
} 