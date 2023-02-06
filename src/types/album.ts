import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class AlbumDto {
  id: string;
  name: string;
  year: number;

  @IsUUID()
  artistId: string | null;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  artistId: string | null;
}
