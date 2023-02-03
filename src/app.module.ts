import { Module } from '@nestjs/common';
import {
  UserController,
  ArtistController,
  AlbumController,
  TrackController,
} from './controllers';
import {
  UserService,
  ArtistService,
  AlbumService,
  TrackService,
} from './services';

@Module({
  imports: [],
  controllers: [
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
  ],
  providers: [UserService, ArtistService, AlbumService, TrackService],
})
export class AppModule {}
