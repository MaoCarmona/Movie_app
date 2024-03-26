import type { MovieModel } from "./movies.model";
import type { findAllQuery } from "./interfaces";

export interface IMoviesRepository {
  findAll: (paginated: findAllQuery) => Promise<MovieModel[]>;
  findByTitle: (title: string) => Promise<MovieModel | null>;
}

export const MOVIE_REPOSITORY = Symbol("IMoviesRepository");
