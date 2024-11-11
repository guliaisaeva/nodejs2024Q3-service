import { Injectable, NotFoundException } from '@nestjs/common';
import { TAlbum } from 'src/models/models';
import { CreateAlbumDto } from './dto/create.dto';
import { Album } from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { tracks } from 'src/track/track.service';

export const albums: TAlbum[] = [];

@Injectable()
export class AlbumService {
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    albums.push(album);
    return album;
  }

  findAllAlbums() {
    return albums;
  }

  findAlbumById(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return Object.assign(album, updateAlbumDto);
  }

  removeAlbum(id: string) {
    const index = albums.findIndex((album) => album.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    albums.splice(index, 1);

    const albumTracks = tracks.filter((track) => (track.artistId = id));
    albumTracks.forEach((track) => {
      track.albumId = null;
    });

    return albums;
  }
}
