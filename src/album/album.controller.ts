import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UUIDvalidate } from 'src/user/pipe/user.UUID';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get()
  @HttpCode(200)
  findAllAlbums() {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  findAlbumById(@Param('id', UUIDvalidate) id: string) {
    return this.albumService.findAlbumById(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id', UUIDvalidate) id: string) {
    return this.albumService.removeAlbum(id);
  }
}
