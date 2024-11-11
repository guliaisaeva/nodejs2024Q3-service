import { Injectable, NotFoundException } from '@nestjs/common';

import { TArtist } from 'src/models/models';
import { CreateArtistDto } from './dto/create.dto';
import { Artist } from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { tracks } from 'src/track/track.service';
import { albums } from 'src/album/album.service';
import { favorites } from 'src/favorites/favorites.service';

export const artists: TArtist[] = [];

@Injectable()
export class ArtistService {
  createArtist(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    artists.push(artist);
    return artist;
  }

  findAllArtists() {
    return artists;
  }

  findArtistById(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    if (updateArtistDto.name) {
      artist.name = updateArtistDto.name;
    }
    if (updateArtistDto.grammy !== artist.grammy) {
      artist.grammy = updateArtistDto.grammy;
    }

    return artist;
  }

  removeArtist(id: string) {
    const index = artists.findIndex((artist) => artist.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    artists.splice(index, 1);

    const artistOfTracks = tracks.filter((track) => (track.artistId = id));
    artistOfTracks.forEach((track) => {
      track.artistId = null;
    });

    const artistOfAlbums = albums.filter((album) => (album.artistId = id));
    artistOfAlbums.forEach((album) => {
      album.artistId = null;
    });

    const favoviteAlbum = favorites.albums.findIndex((album) => album === id);
    favorites.albums.splice(favoviteAlbum, 1);

    return artists;
  }
}
