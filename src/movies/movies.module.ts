import { MoviesService } from './application/movies.service';
import { Module } from "@nestjs/common";
import { MOVIE_REPOSITORY } from "./domain/movies.repository";
import { MoviesJsonRepository } from "./infrastrusture/persistence/movies.json.repository";
import { MoviesController } from './application/movies.controller';
import { JsonDataSource } from '@app/shared/infrastructure/persistence/json/data-source';


@Module({
  imports: [],
  controllers:[MoviesController],
  providers: [
    JsonDataSource,
        MoviesService, 
    {
      provide: MOVIE_REPOSITORY,
      useClass: MoviesJsonRepository,
    },
  ],
  exports: [],
})
export class MoviesModule {}