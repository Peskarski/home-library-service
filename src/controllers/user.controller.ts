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
import { CreateUserDto, UpdateUserDto } from '..//types/user';
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
    const userWithVersion = {
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDTO,
    };

    return this.userService.create(userWithVersion);
  }

  @Put(':id')
  async update(
    @Param() params: QueryParams,
    @Body() updateUserDTO: UpdateUserDto,
  ) {
    await this.checkIfUserExists(params.id);

    const user = await this.userService.getById(params.id);

    console.log(user.password, updateUserDTO.oldPassword);

    if (user.password !== updateUserDTO.oldPassword) {
      throw new HttpException(
        'Old password does not match the one provided',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = {
      ...user,
      password: updateUserDTO.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    console.log(updateUserDTO);

    return await this.userService.update(params.id, updatedUser);
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
