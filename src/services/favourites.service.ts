import { Favourites } from '../types/favourites';

export class FavouritesService {
  favourites: Favourites;

  constructor() {
    this.favourites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async getAll() {
    return this.favourites;
  }

  async postTrack(id: string) {
    this.favourites.tracks.push(id);
  }

  async deleteTrack(id: string) {
    this.favourites = {
      ...this.favourites,
      tracks: this.favourites.tracks.filter((favId) => favId !== id),
    };
  }

  async postAlbum(id: string) {
    this.favourites.albums.push(id);
  }

  async deleteAlbum(id: string) {
    this.favourites = {
      ...this.favourites,
      albums: this.favourites.albums.filter((favId) => favId !== id),
    };
  }

  async postArtist(id: string) {
    this.favourites.artists.push(id);
  }

  async deleteArtist(id: string) {
    this.favourites = {
      ...this.favourites,
      artists: this.favourites.artists.filter((favId) => favId !== id),
    };
  }
}
