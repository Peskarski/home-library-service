export class AlbumDto {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}
