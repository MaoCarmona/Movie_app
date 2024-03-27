import { BaseModel } from "@app/base/domain/base.model";

export class MovieModel extends BaseModel {
  public constructor(data: MovieModel) {
    super(data);
    Object.assign(this, data);
  }
  public title: string;
  public year: string;
  public genres: string[];
  public ratings: number[];
  public viewerCount: number;
  public storyline: string;
  public actors: string[];
  public duration: string;
  public releaseDate: Date;
  public contentRating: string;
  public posterImage: string;
  public popularity: number;
  public similarity: number;
}
