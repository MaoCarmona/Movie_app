import { Inject, Injectable } from "@nestjs/common";
import { findAllQuery, findByTitleQuery } from "../domain/interfaces";
import { MovieModel } from "../domain/movies.model";
import {
  MOVIE_REPOSITORY,
  IMoviesRepository,
} from "../domain/movies.repository";

@Injectable()
export class MoviesService {
  public constructor(
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: IMoviesRepository
  ) {}

  public async findOne(query: findByTitleQuery): Promise<MovieModel> {
    return this.movieRepository.findByTitle(query.title);
  }
  public async findAll(query: findAllQuery): Promise<MovieModel[]> {
    return this.movieRepository.findAll(query);
  }

  public async findByActor(query: findAllQuery): Promise<MovieModel[]>{
    return this.movieRepository.findByActor(query);
  };

  public async findSimilarMovies(query: findAllQuery): Promise<MovieModel[]>{
    return this.movieRepository.findSimilarMovies(query);
  };

  public async sortByPopularity(query: findAllQuery): Promise<MovieModel[]>{
    return this.movieRepository.sortByPopularity(query);
  };

  public async sortByDuration(query: findAllQuery): Promise<MovieModel[]>{
    return this.movieRepository.sortByDuration(query);
  };

  public async sortByYear(query: findAllQuery): Promise<MovieModel[]>{
    return this.movieRepository.sortByYear(query);
  };
}
