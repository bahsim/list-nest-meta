import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishOwnerGuard } from './guards/wish-owner.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get(':id')
  @UseGuards(WishOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(WishOwnerGuard)
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  @UseGuards(WishOwnerGuard)
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }
} 