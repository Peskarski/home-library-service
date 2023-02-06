import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import {
  FavouritesService,
  TrackService,
  ArtistService,
  AlbumService,
} from '../services';
import { QueryParams } from '../types/common';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('/favs')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  async getAll() {
    const favs = await this.favouritesService.getAll();

    const albumsPromises = favs.albums.map(async (id) => {
      return await this.albumService.getById(id);
    });
    const albums = await Promise.all(albumsPromises);

    console.log(favs);

    const tracksPromises = favs.tracks.map(async (id) => {
      return await this.trackService.getById(id);
    });
    const tracks = await Promise.all(tracksPromises);

    const artistsPromises = favs.artists.map(async (id) => {
      return await this.artistService.getById(id);
    });
    const artists = await Promise.all(artistsPromises);

    return {
      albums,
      tracks,
      artists,
    };
  }

  @Post('/track/:id')
  async postTrack(@Param() params: QueryParams) {
    const track = await this.trackService.getById(params.id);

    if (!track) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.postTrack(params.id);
  }

  @Post('/artist/:id')
  async postArtist(@Param() params: QueryParams) {
    const artist = await this.artistService.getById(params.id);

    if (!artist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.postArtist(params.id);
  }

  @Post('/album/:id')
  async postAlbum(@Param() params: QueryParams) {
    const album = await this.albumService.getById(params.id);

    if (!album) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.postAlbum(params.id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: QueryParams) {
    const track = await this.trackService.getById(params.id);

    if (!track) {
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.deleteTrack(params.id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: QueryParams) {
    const artist = await this.artistService.getById(params.id);

    if (!artist) {
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.deleteArtist(params.id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: QueryParams) {
    const album = await this.albumService.getById(params.id);

    if (!album) {
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.favouritesService.deleteAlbum(params.id);
  }
}
