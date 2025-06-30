import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save(wishlist);
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOneBy({ id });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.save({ ...updateWishlistDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.wishlistRepository.delete(id);
  }
} 