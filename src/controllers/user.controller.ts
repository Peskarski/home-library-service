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
import { UserService } from '../services/user.service';
import { CreateUserDto } from '..//types/user';
import { QueryParams } from '../types/common';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param() params: QueryParams) {
    await this.checkIfUserExists(params.id);

    return await this.userService.getById(params.id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDto) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  async update(
    @Param() params: QueryParams,
    @Body() createUserDTO: CreateUserDto,
  ) {
    await this.checkIfUserExists(params.id);

    return await this.userService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: QueryParams) {
    await this.checkIfUserExists(params.id);

    return await this.userService.delete(params.id);
  }

  async checkIfUserExists(id: string) {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }
  }
}
