import { Exclude, Expose } from "class-transformer";
import { MovieModel } from "../movies.model";

@Exclude()
export class MoviesByActorResponseDto extends MovieModel {
    @Expose()
    public title: string;

    @Expose()
    public actors: string[];

    @Expose()
    public genres: string[];
}
@Exclude()
export class MoviesByPopularityResponseDto extends MovieModel {
    @Expose()
    public title: string;

    @Expose()
    public actors: string[];

    @Expose()
    public genres: string[];

    @Expose()
    public popularity: number;

}
@Exclude()
export class MoviesBySimilarityResponseDto extends MovieModel {
    @Expose()
    public title: string;

    @Expose()
    public actors: string[];

    @Expose()
    public genres: string[];

    @Expose()
    public similarity: number;
}
@Exclude()
export class MoviesByYearResponseDto extends MovieModel {
    @Expose()
    public title: string;

    @Expose()
    public actors: string[];

    @Expose()
    public genres: string[];

    @Expose()
    public override year: string;
}
@Exclude()
export class MoviesByDurationResponseDto extends MovieModel {
    @Expose()
    public title: string;

    @Expose()
    public actors: string[];

    @Expose()
    public genres: string[];

    @Expose()
    public duration: string;
}