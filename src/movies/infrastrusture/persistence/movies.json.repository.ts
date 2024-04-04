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
export class MoviesJsonRepository extends JsonRepository<MovieModel> implements IMoviesRepository {
  protected get entityName(): string {
   return '';
  }
  public constructor(protected readonly jsonDataSource: JsonDataSource<MovieModel>) {
    super(jsonDataSource);
  }

  private readonly HIGH_WEIGHT = 0.5;
  private readonly MEDIUM_WEIGHT = 0.3;
  private readonly LOW_WEIGHT = 0.2;

  /**
 * Retrieves all movies with pagination.
 * 
 * @param paginated - An object that contains pagination parameters.
 * @returns A promise that resolves to an array of movie objects.
 */
  public async findAll(paginated: findAllQuery): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    return paginatedResponse<MovieModel>(allMovies, paginated);
  }


  /**
 * Finds a movie by its title.
 * 
 * @param title - The title of the movie to find.
 * @returns A promise that resolves to the movie object with the specified title, or null if no movie is found.
 */
  public async findByTitle(title: string): Promise<MovieModel | null> {
    const allMovies = await this.getAll();
    return allMovies.find(movie => movie.title === title) || null;
  }

  /**
 * Finds movies by actor.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @returns A promise that resolves to an array of movie objects filtered by the specified actor.
 */
  public async findByActor(paginated: findAllQuery): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    const filteredMovies: MovieModel[] = allMovies.filter(movie => movie.actors.includes(paginated.actor));
    return plainToInstance(
      MoviesByActorResponseDto,
      paginatedResponse<MovieModel>(filteredMovies, paginated)
    );
  }

  /**
 * Sorts movies by their popularity.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @returns A promise that resolves to an array of movie objects sorted by their popularity.
 */
  public async sortByPopularity(paginated: findAllQuery): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    const sortedMovies = _.orderBy(allMovies, movie => movie.popularity = this.calculatePopularity(movie), paginated.order.toLowerCase());
    return plainToInstance(
      MoviesByPopularityResponseDto,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
  }

  /**
   * Calculates the popularity score of a movie based on its average rating, total number of ratings, and viewer count.
   * @param movie - The movie object for which the popularity score needs to be calculated.
   * @returns The popularity score of the movie.
   */
  private calculatePopularity(movie: MovieModel): number {
    const averageRating = this.calculateAverageRating(movie.ratings);
    const totalRatings = movie.ratings.length;
    const popularity = averageRating * this.HIGH_WEIGHT + totalRatings * this.MEDIUM_WEIGHT + movie.viewerCount * this.LOW_WEIGHT;
    return popularity;
  }

  /**
 * Calculates the average rating based on an array of ratings.
 * 
 * @param ratings - An array of numbers representing the ratings.
 * @returns The average rating as a number.
 */
  private calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
  }

  /**
 * Finds similar movies based on a given movie title and similarity threshold.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @returns A promise that resolves to an array of movie objects that are similar to the given movie.
 */
  public async findSimilarMovies(paginated: findAllQuery): Promise<MovieModel[]> {
    const { title, threshold, order } = paginated;
    const allMovies: MovieModel[] = await this.getAll();
    const movie: MovieModel = allMovies.find(movie => movie.title === title);
    const similarMoviesWithScores = allMovies.map(otherMovie => ({
      movie: otherMovie,
      similarity: this.calculateSimilarityScore(movie, otherMovie),
    }));
    const similarMovies = similarMoviesWithScores.filter(item => item.similarity >= threshold);
    const mappedMovies: MovieModel[] = similarMovies.map(item => ({ ...item.movie, similarity: item.similarity }));
    const sortedMovies = _.orderBy(mappedMovies, 'similarity', order.toLowerCase());
    return plainToInstance(
      MoviesBySimilarityResponseDto,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
  }

  /**
   * Calculates the similarity score between two movie objects based on their genres, ratings, and cast.
   * @param movieA - The first movie object.
   * @param movieB - The second movie object.
   * @returns The similarity score between movieA and movieB, ranging from 0 to 1.
   */
  private calculateSimilarityScore(movieA: MovieModel, movieB: MovieModel): number { 
    const genreScore = this.calculateGenreSimilarity(movieA.genres, movieB.genres);
    const ratingScore = Math.abs(this.calculateAverageRating(movieA.ratings) - this.calculateAverageRating(movieB.ratings));
    const castScore = this.calculateCastSimilarity(movieA.actors, movieB.actors);

    return genreScore * this.HIGH_WEIGHT + ratingScore * this.MEDIUM_WEIGHT + castScore * this.LOW_WEIGHT;
  }

  /**
   * Calculates the similarity score between two arrays of movie genres.
   * It determines the number of shared genres between the two arrays and divides it by the maximum number of genres in either array.
   * 
   * @param genresA - The genres of the first movie.
   * @param genresB - The genres of the second movie.
   * @returns The similarity score between the two arrays of genres, ranging from 0 to 1.
   */
  private calculateGenreSimilarity(genresA: string[], genresB: string[]): number {
    const sharedGenres = genresA.filter(genre => genresB.includes(genre));
    const maxGenresLength = Math.max(genresA.length, genresB.length);
    return sharedGenres.length / maxGenresLength;
  }

  /**
   * Calculates the similarity score between two arrays of movie cast members.
   * It determines the number of shared cast members between the two arrays and divides it by the maximum number of cast members in either array.
   * 
   * @param castA - The cast members of the first movie.
   * @param castB - The cast members of the second movie.
   * @returns The similarity score between the two arrays of cast members, ranging from 0 to 1.
   */
  private calculateCastSimilarity(castA: string[], castB: string[]): number {
    const sharedCast = castA.filter(actor => castB.includes(actor));
    const similarityScore = sharedCast.length / Math.max(castA.length, castB.length);
    return similarityScore;
  }

  /**
 * Sorts movies by their duration.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @returns A promise that resolves to an array of movie objects sorted by their duration.
 */
  public async sortByDuration(paginated: findAllQuery): Promise<MovieModel[]> {
    return this.sortByAttribute(paginated, 'duration',MoviesByDurationResponseDto);
  }

  /**
 * Sorts movies by their release year.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @returns A promise that resolves to an array of movie objects sorted by their release year.
 */
  public async sortByYear(paginated: findAllQuery): Promise<MovieModel[]> {
    return this.sortByAttribute(paginated, 'releaseDate', MoviesByYearResponseDto);
  }

  /**
 * Sorts movies by the specified attribute.
 * 
 * @param paginated - An object that contains pagination parameters and an optional properties.
 * @param attribute - The attribute by which to sort the movies.
 * @param DTO - The DTO (Data Transfer Object) class to use for the response.
 * @returns A promise that resolves to an array of movie objects sorted by the specified attribute.
 */
  private async sortByAttribute(paginated: findAllQuery, attribute: string, DTO): Promise<MovieModel[]> {
    const allMovies = await this.getAll();
    const sortedMovies = _.orderBy(allMovies, movie => this.extractAttributeValue(movie, attribute), paginated.order.toLowerCase());
    return plainToInstance(
      DTO,
      paginatedResponse<MovieModel>(sortedMovies, paginated)
    );
  }

/**
 * Extracts the value of the specified attribute from a movie object.
 * 
 * @param movie - The movie object from which to extract the attribute value.
 * @param attribute - The attribute for which to extract the value.
 * @returns The value of the specified attribute.
 * @throws {Error} If the attribute is invalid.
 */
  private extractAttributeValue(movie: MovieModel, attribute: string): any {
    if (attribute === 'duration') {
      return this.convertDurationToMinutes(movie.duration);
    } else if (attribute === 'releaseDate') {
      return new Date(movie.releaseDate).getFullYear();
    } else {
      throw new Error(`Invalid attribute: ${attribute}`);
    }
  }

  /**
 * Converts a duration string to minutes.
 * 
 * @param duration - The duration string to convert.
 * @returns The duration in minutes as a number.
 * @throws {Error} If the duration string is not in a valid format.
 */
  private convertDurationToMinutes(duration: string): number {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(durationRegex);

    if (!matches) {
      throw new Error("Formato de duración no válido");
    }

    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;

    return hours * 60 + minutes;
  }
}

