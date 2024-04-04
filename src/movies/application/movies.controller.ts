import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { findAllDto, findByTitleDto } from "../domain/dto/movies.dto";

@Controller("movies")
export class MoviesController {
  public constructor(private readonly movieService: MoviesService) {}
  @Get("/all")
  public findAll(@Query() query: findAllDto) {
    return this.movieService.findAll(query);
  }
  @Get("/title")
  public findOne(@Query() query: findByTitleDto) {
    return this.movieService.findOne(query);
  }
  @Get("/actor")
  public findByActor(@Query() query: findAllDto) {
    return this.movieService.findByActor(query);
  }
  @Get("/similarity")
  public findSimilarMovies(@Query() query: findAllDto) {
    return this.movieService.findSimilarMovies(query);
  }
  @Get("/popularity")
  public sortByPopularity(@Query() query: findAllDto) {
    return this.movieService.sortByPopularity(query);
  }
  @Get("/duration")
  public sortByDuration(@Query() query: findAllDto) {
    return this.movieService.sortByDuration(query);
  }
  @Get("/year")
  public sortByYear(@Query() query: findAllDto) {
    return this.movieService.sortByYear(query);
  }
}
