import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class TrackDto {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsUUID()
  artistId: string | null;

  @IsUUID()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
