import { IsString, IsBoolean } from 'class-validator';

export class ArtistDto {
  id: string;
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
