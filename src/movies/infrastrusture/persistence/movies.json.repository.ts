import { Injectable } from "@nestjs/common";
import { MovieModel } from "@app/movies/domain/movies.model";
import { JsonRepository } from "@app/shared/infrastructure/persistence/json.repository";
import { IMoviesRepository } from "@app/movies/domain/movies.repository";
import { findAllQuery } from "@app/movies/domain/interfaces";
import { JsonDataSource } from "@app/shared/infrastructure/persistence/json/data-source";
import { plainToInstance } from "class-transformer";
import {
  MoviesByActorResponseDto,
  MoviesByDurationResponseDto,
  MoviesByPopularityResponseDto,
  MoviesBySimilarityResponseDto,
  MoviesByYearResponseDto,
} from "@app/movies/domain/dto";
import { paginatedResponse } from "@app/shared/domain/utils/paginated.utill";
import * as _ from 'lodash';

@Injectable()
export class MoviesJsonRepository
  extends JsonRepository<MovieModel>
  implements IMoviesRepository
{
  public constructor(protected readonly jsonDataSource: JsonDataSource<MovieModel>) {
    super(jsonDataSource);
  }
  protected readonly entityName = "";

  public async findByTitle(title: string): Promise<MovieModel | null> {
    const allMovies = await this.getAll();
    return allMovies.find((movie) => movie.title === title) || null;
  }

  public async findAll(paginated: findAllQuery): Promise<MovieModel[]> {
    const { categorizeBy } = paginated;
    const selectedFunction =
      this.categoryFunctions[categorizeBy] || this.categoryFunctions["default"];
    return await selectedFunction(paginated);
  }

  private readonly categoryFunctions: Record<string, Function> = {
    popularity: this.sortByPopularity.bind(this),
    actor: this.findByActor.bind(this),
    similarity: this.findSimilarMovies.bind(this),
    duration: this.sortByDuration.bind(this),
    year: this.sortByYear.bind(this),
    default: this.getAllPaginated.bind(this),
  };

  private async getAllPaginated(
    paginated: findAllQuery
  ): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    return paginatedResponse<MovieModel>(allMovies, paginated);
  }

  public async findByActor(paginated: findAllQuery): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    const filteredMovies: MovieModel[] = allMovies.filter((movie) =>
      movie.actors.includes(paginated.actor)
    );
    return plainToInstance(
      MoviesByActorResponseDto,
      paginatedResponse<MovieModel>(filteredMovies, paginated)
    );
  }

  // Sorting By popularity
  public async sortByPopularity(
    paginated: findAllQuery
  ): Promise<MovieModel[]> {
    const { order } = paginated;
    const allMovies = await this.getAll();
    const sortedMovies = _.orderBy(allMovies, movie => movie.popularity =this.calculatePopularity(movie), order.toLowerCase());
    return plainToInstance(
      MoviesByPopularityResponseDto,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
  }
  private calculatePopularity(movie: MovieModel): number {
    const ratingWeight = 0.5;
    const totalRatingsWeight = 0.3;
    const viewerCountWeight = 0.2;
    const averageRating = this.calculateAverageRating(movie.ratings);
    const popularity =
      averageRating * ratingWeight +
      movie.ratings.length * totalRatingsWeight +
      movie.viewerCount * viewerCountWeight;
    return popularity;
  }
  private calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    return average;
  }
  //End Sorting By popularity

  //Searching by similarity
  public async findSimilarMovies(
    paginated: findAllQuery
  ): Promise<MovieModel[]> {
    const { title, threshold,order } = paginated;
    const allMovies: MovieModel[] = await this.getAll();
    const movie: MovieModel = allMovies.find((movie) => movie.title === title);
    const similarMoviesWithScores = allMovies.map((otherMovie) => ({
      movie: otherMovie,
      similarity: this.calculateSimilarityScore(movie, otherMovie),
    }));
    // Filter similar movies based on the similarity threshold
    const similarMovies = similarMoviesWithScores.filter(
      (item) => item.similarity >= threshold
    );

    const mappedMovies: MovieModel[] = similarMovies.map((item) => ({
      ...item.movie,
      similarity: item.similarity,
    }));
    const sortedMovies = _.orderBy(mappedMovies, 'similarity', order.toLowerCase());
    return plainToInstance(
      MoviesBySimilarityResponseDto,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
  }

  private calculateSimilarityScore(
    movieA: MovieModel,
    movieB: MovieModel
  ): number {
    const genreWeight = 0.5; // Greater weight in gender
    const ratingWeight = 0.3;
    const castWeight = 0.2;

    // Calculate weighted similarity score
    const genreScore = this.calculateGenreSimilarity(
      movieA.genres,
      movieB.genres
    );
    const ratingScore = Math.abs(
      this.calculateAverageRating(movieA.ratings) -
        this.calculateAverageRating(movieB.ratings)
    );
    const castScore = this.calculateCastSimilarity(
      movieA.actors,
      movieB.actors
    );

    const weightedScore =
      genreScore * genreWeight +
      ratingScore * ratingWeight +
      castScore * castWeight;
    return weightedScore;
  }

  private calculateGenreSimilarity(
    genresA: string[],
    genresB: string[]
  ): number {
    // Calculate gender similarity as the number of shared genders.
    const sharedGenres = genresA.filter((genre) => genresB.includes(genre));
    return sharedGenres.length / Math.max(genresA.length, genresB.length);
  }

  private calculateCastSimilarity(castA: string[], castB: string[]): number {
    // Calculate the cast similarity as the number of shared actors.
    const sharedCast = castA.filter((actor) => castB.includes(actor));
    return sharedCast.length / Math.max(castA.length, castB.length);
  }
  // End of searching by Similarity

  public async sortByDuration(paginated: findAllQuery): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    const { order } = paginated;
    const sortedMovies = _.orderBy(allMovies, movie => this.convertDurationToMinutes(movie.duration), order.toLowerCase());

    return plainToInstance(
        MoviesByDurationResponseDto,
        paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
}

public async sortByYear(paginated: findAllQuery): Promise<MovieModel[]> {
  const allMovies = await this.getAll();
  const { order } = paginated;
  const getReleaseYear = (movie: MovieModel) => {
      return parseInt(movie.year);
  };
  const sortedMovies = _.orderBy(allMovies, getReleaseYear, order.toLowerCase());
  return plainToInstance(
      MoviesByYearResponseDto,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
  );
}

  private convertDurationToMinutes(duration: string): number {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/; // Regular expression to extract hours and minutes
    const matches = duration.match(durationRegex);

    if (!matches) {
      throw new Error("Formato de duración no válido");
    }

    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;

    return hours * 60 + minutes;
  }
}
