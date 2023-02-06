import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import { ArtistService, FavouritesService, TrackService } from '../services';
import { CreateArtistDto } from '../types/artist';
import { QueryParams } from '../types/common';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('/artist')
export class ArtistController {
  constructor(
    private readonly userService: ArtistService,
    private readonly trackService: TrackService,
    private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param() params: QueryParams) {
    await this.checkIfArtistExists(params.id);
    return this.userService.getById(params.id);
  }

  @Post()
  create(@Body() createUserDTO: CreateArtistDto) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  async update(
    @Param() params: QueryParams,
    @Body() createUserDTO: CreateArtistDto,
  ) {
    await this.checkIfArtistExists(params.id);

    return this.userService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: QueryParams) {
    await this.checkIfArtistExists(params.id);

    const tracks = await this.trackService.getAll();
    tracks.map((track) => {
      if (track.artistId === params.id) {
        track.artistId = null;
      }
    });

    const favs = await this.favouritesService.getAll();
    const favArtists = favs.artists;

    if (favArtists.find((id) => id === params.id)) {
      await this.favouritesService.deleteArtist(params.id);
    }

    await this.trackService.setTracks(tracks);

    return this.userService.delete(params.id);
  }

  async checkIfArtistExists(id: string) {
    const artist = await this.userService.getById(id);

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }
  }
}
