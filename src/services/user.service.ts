import { Injectable } from '@nestjs/common';
import Repository from '../shared/repositiry';
import { UserDto } from '../types/user';

@Injectable()
export class UserService extends Repository<UserDto> {}
