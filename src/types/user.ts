import { IsString } from 'class-validator';

export class UserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
