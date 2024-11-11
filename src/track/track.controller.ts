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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create.dto';
import { UUIDvalidate } from 'src/user/pipe/user.UUID';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  @HttpCode(200)
  findAllTracks() {
    return this.trackService.findAllTracks();
  }

  @Get(':id')
  @HttpCode(200)
  findTrackById(@Param('id', UUIDvalidate) id: string) {
    return this.trackService.findTrackById(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id', UUIDvalidate) id: string) {
    return this.trackService.removeTrack(id);
  }
}
