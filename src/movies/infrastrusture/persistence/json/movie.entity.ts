
import { BaseEntity } from '@app/base/infrastructure/persistence/entities/base.entity';
import { MovieModel } from '@app/movies/domain/movies.model';
import { IsString, IsNotEmpty, IsArray, IsNumber, IsDate } from 'class-validator';

export class MovieEntity extends BaseEntity implements MovieModel {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  ratings: number[];
  
  @IsArray()
  @IsNumber()
  popularity: number;

  @IsArray()
  @IsNumber()
  similarity: number;

  @IsNotEmpty()
  @IsNumber()
  viewerCount: number;

  @IsNotEmpty()
  @IsString()
  storyline: string;

  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsString()
  contentRating: string;

  @IsNotEmpty()
  @IsString()
  posterImage: string;
}
