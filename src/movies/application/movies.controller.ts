import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { findAllDto, findByTitleDto } from '../domain/dto/movies.dto';

@Controller("movies")
export class MoviesController {
    public constructor(private movieService: MoviesService){}
    @Post("/all")
    public findAll(@Body() query:findAllDto){
        return this.movieService.findAll(query);
    }
    @Get()
    public findOne(query:findByTitleDto){
        return this.movieService.findOne(query);
    }
    
}
