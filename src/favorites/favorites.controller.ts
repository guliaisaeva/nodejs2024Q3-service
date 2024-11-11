import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUIDvalidate } from 'src/user/pipe/user.UUID';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAllFavorites() {
    return this.favsService.findAllFavorites();
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', UUIDvalidate) id: string) {
    return this.favsService.removeTrack(id);
  }
}
