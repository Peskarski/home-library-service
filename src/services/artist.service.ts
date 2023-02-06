import { Injectable } from '@nestjs/common';
import Repository from '../shared/repositiry';
import { ArtistDto } from '../types/artist';

@Injectable()
export class ArtistService extends Repository<ArtistDto> {}
