import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums } from 'src/album/album.service';
import { artists } from 'src/artist/artist.service';
import { TFavorites } from 'src/models/models';
import { tracks } from 'src/track/track.service';
import { Favorites } from './favorites.entity';
export const favorites: TFavorites = new Favorites();

@Injectable()
export class FavoritesService {
  findAllFavorites() {
    return {
      artists: favorites.artists
        .map((id) => artists.find((artist) => artist.id === id))
        .filter((n) => n),
      albums: favorites.albums
        .map((id) => albums.find((album) => album.id === id))
        .filter((n) => n),
      tracks: favorites.tracks
        .map((id) => tracks.find((track) => track.id === id))
        .filter((n) => n),
    };
  }

  addArtist(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    if (!favorites.artists.includes(artist.id))
      favorites.artists.push(artist.id);
    return 'Artist added to favorites';
  }

  removeArtist(id: string) {
    const index = favorites.artists.findIndex((artist) => artist === id);
    if (index == -1) {
      throw new NotFoundException('Artist is not in favorites');
    }
    favorites.artists.splice(index, 1);
    return 'Artist removed from favorites';
  }

  addAlbum(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException('Album is not found');
    }
    if (!favorites.albums.includes(album.id)) favorites.albums.push(album.id);
    return 'Album successfully added to favorites.';
  }

  removeAlbum(id: string) {
    const index = favorites.albums.findIndex((album) => album === id);
    if (index == -1) {
      throw new NotFoundException('Album is not in your favorites list.');
    }
    favorites.albums.splice(index, 1);
    return 'Album removed from favorites list';
  }

  addTrack(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    if (!favorites.tracks.includes(track.id)) favorites.tracks.push(track.id);
    return 'Track successfully added to favorites';
  }

  removeTrack(id: string) {
    const index = favorites.tracks.findIndex((track) => track === id);
    if (index == -1) {
      throw new NotFoundException('Track is not in your favorites');
    }
    favorites.tracks.splice(index, 1);
    return 'Track removed from favorites list';
  }
}
