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
} from '@nestjs/common';
import { AlbumService, ArtistService } from '../services';
import { CreateAlbumDto } from '../types/album';

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
  getById(@Param() params: { id: string }) {
    return this.albumService.getById(params.id);
  }

  @Post()
  async create(@Body() createAlbumDTO: CreateAlbumDto) {
    const { artistId } = createAlbumDTO;

    const artist = await this.artistService.getById(artistId);

    if (!artist) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    return await this.albumService.create(createAlbumDTO);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() createUserDTO: CreateAlbumDto,
  ) {
    return this.albumService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }) {
    return this.albumService.delete(params.id);
  }
}
