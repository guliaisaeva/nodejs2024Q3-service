import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UUIDvalidate } from 'src/user/pipe/user.UUID';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  findAllArtists() {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  findArtistById(@Param('id', UUIDvalidate) id: string) {
    return this.artistService.findArtistById(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id', UUIDvalidate) id: string) {
    return this.artistService.removeArtist(id);
  }
}
