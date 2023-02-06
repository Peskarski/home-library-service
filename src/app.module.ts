import { Module } from '@nestjs/common';
import {
  UserController,
  ArtistController,
  AlbumController,
  TrackController,
  FavouritesController,
} from './controllers';
import {
  UserService,
  ArtistService,
  AlbumService,
  TrackService,
  FavouritesService,
} from './services';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
    FavouritesController,
  ],
  providers: [
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavouritesService,
  ],
})
export class AppModule {}
