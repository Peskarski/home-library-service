import { Injectable } from '@nestjs/common';
import Repository from '../shared/repositiry';
import { TrackDto } from '../types/track';

@Injectable()
export class TrackService extends Repository<TrackDto> {
  async setTracks(tracks: TrackDto[]) {
    this.entries = tracks;
  }
}
