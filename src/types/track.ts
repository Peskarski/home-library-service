import { IsUUID } from 'class-validator';

export class TrackDto {
  id: string;
  name: string;

  @IsUUID()
  artistId: string | null;

  @IsUUID()
  albumId: string | null;
  duration: number;
}

export class CreateTrackDto {
  name: string;
  @IsUUID()
  artistId: string | null;

  @IsUUID()
  albumId: string | null;
  duration: number;
}
