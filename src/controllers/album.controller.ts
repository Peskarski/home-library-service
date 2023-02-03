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
import { HttpExceptionFilter } from '../shared/http-exception.filter';
import { AlbumService, ArtistService } from '../services';
import { CreateAlbumDto } from '../types/album';
import { QueryParams } from '../types/common';

@UseFilters(new HttpExceptionFilter())
@Controller('/album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param() params: QueryParams) {
    await this.checkIfAlbumExists(params.id);

    return await this.albumService.getById(params.id);
  }

  @Post()
  async create(@Body() createAlbumDTO: CreateAlbumDto) {
    const { artistId } = createAlbumDTO;

    if (artistId === null) {
      return await this.albumService.create(createAlbumDTO);
    }

    const artist = await this.artistService.getById(artistId);

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    return await this.albumService.create(createAlbumDTO);
  }

  @Put(':id')
  async update(
    @Param() params: QueryParams,
    @Body() createUserDTO: CreateAlbumDto,
  ) {
    await this.checkIfAlbumExists(params.id);

    return await this.albumService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: QueryParams) {
    await this.checkIfAlbumExists(params.id);

    return await this.albumService.delete(params.id);
  }

  async checkIfAlbumExists(id: string) {
    const album = await this.albumService.getById(id);

    if (!album) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
  }
}
