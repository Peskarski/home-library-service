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
import { TrackService, ArtistService, AlbumService } from '../services';
import { CreateTrackDto } from '../types/track';
import { QueryParams } from '../types/common';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('/track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param() params: QueryParams) {
    await this.checkIfTrackExists(params.id);

    return this.trackService.getById(params.id);
  }

  @Post()
  async create(@Body() createTrackDTO: CreateTrackDto) {
    const { artistId, albumId } = createTrackDTO;

    if (artistId === null && albumId === null) {
      return await this.trackService.create(createTrackDTO);
    }

    const artist = await this.artistService.getById(artistId);
    const album = await this.albumService.getById(albumId);

    if (!artist && artistId !== null) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    if (!album && albumId !== null) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    return this.trackService.create(createTrackDTO);
  }

  @Put(':id')
  async update(
    @Param() params: QueryParams,
    @Body() createTrackDTO: CreateTrackDto,
  ) {
    await this.checkIfTrackExists(params.id);

    return await this.trackService.update(params.id, createTrackDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: QueryParams) {
    await this.checkIfTrackExists(params.id);

    return this.trackService.delete(params.id);
  }

  async checkIfTrackExists(id: string) {
    const track = await this.trackService.getById(id);

    if (!track) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
  }
}
