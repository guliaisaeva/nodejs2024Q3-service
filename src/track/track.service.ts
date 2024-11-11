import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { TTrack } from 'src/models/models';
import { Track } from './track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favorites } from 'src/favorites/favorites.service';

export const tracks: TTrack[] = [];

@Injectable()
export class TrackService {
  createTrack(createTrackDto: CreateTrackDto) {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId,
      createTrackDto.albumId,
    );
    tracks.push(track);
    return track;
  }

  findAllTracks() {
    return tracks;
  }

  findTrackById(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    return Object.assign(track, updateTrackDto);
  }

  removeTrack(id: string) {
    const index = tracks.findIndex((track) => track.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    tracks.splice(index, 1);
    const favoriteTrack = favorites.tracks.findIndex((track) => track === id);
    favorites.tracks.splice(favoriteTrack, 1);

    return tracks;
  }
}
