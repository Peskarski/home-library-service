import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '..//types/user';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param() params: { id: string }) {
    return this.userService.getById(params.id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDto) {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() createUserDTO: CreateUserDto,
  ) {
    return this.userService.update(params.id, createUserDTO);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }) {
    return this.userService.delete(params.id);
  }
}
