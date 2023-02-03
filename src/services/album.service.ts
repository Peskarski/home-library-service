import { Injectable } from '@nestjs/common';
import Repository from '../shared/repositiry';
import { AlbumDto } from '../types/album';

@Injectable()
export class AlbumService extends Repository<AlbumDto> {}
