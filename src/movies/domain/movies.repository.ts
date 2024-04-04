import type { MovieModel } from "./movies.model";
import type { findAllQuery } from "./interfaces";

export interface IMoviesRepository {
  findAll: (paginated: findAllQuery) => Promise<MovieModel[]>;
  findByTitle: (title: string) => Promise<MovieModel | null>;
  findByActor : (paginated: findAllQuery) => Promise<MovieModel[]>;
  findSimilarMovies : (paginated: findAllQuery) => Promise<MovieModel[]>;
  sortByPopularity : (paginated: findAllQuery) => Promise<MovieModel[]>;
  sortByDuration : (paginated: findAllQuery) => Promise<MovieModel[]>;
  sortByYear : (paginated: findAllQuery) => Promise<MovieModel[]>;
}

export const MOVIE_REPOSITORY = Symbol("IMoviesRepository");
