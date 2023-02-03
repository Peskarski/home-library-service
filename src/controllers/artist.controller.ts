import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../types/artist';

@Controller('/artist')
export class ArtistController {
  constructor(private readonly userService: ArtistService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param() params: { id: string }) {
    return this.userService.getById(params.id);
  }

  @Post()
  create(@Body() createUserDTO: CreateArtistDto) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() createUserDTO: CreateArtistDto,
  ) {
    return this.userService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }) {
    return this.userService.delete(params.id);
  }
}
