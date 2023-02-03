import { Module } from '@nestjs/common';
import {
  UserController,
  ArtistController,
  AlbumController,
} from './controllers';
import { UserService, ArtistService, AlbumService } from './services';

@Module({
  imports: [],
  controllers: [UserController, ArtistController, AlbumController],
  providers: [UserService, ArtistService, AlbumService],
})
export class AppModule {}
