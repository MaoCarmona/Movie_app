## Installation and Running
## You need install nodejs and yarn before run following commands
```bash
$ yarn install
$ nest start --watch

## Run Test
$ yarn test
```



## You need install Docker Daemon before run following commands
#Docker
```sh 
docker build -t movie_app -f docker/app.dockerfile --no-cache .

docker run -d -p 3002:3002 --name movie_app_container movie_app

```


## MOVIES JSON REPOSITORY
The MoviesJsonRepository class is a repository implementation that provides methods for retrieving and manipulating movie data. It extends the JsonRepository class and implements the IMoviesRepository interface. The class includes methods for finding movies by various criteria, sorting movies by popularity, duration, and release year, and calculating similarity scores between movies based on genres, ratings, and cast members.

Main functionalities
Finding movies by title, actor, and similarity
Sorting movies by popularity, duration, and release year
Calculating similarity scores between movies based on genres, ratings, and cast members

## METHODS

findAll(paginated: findAllQuery): Promise<MovieModel[]>: Retrieves all movies with pagination.

findByTitle(title: string): Promise<MovieModel | null>: Finds a movie by its title.

findByActor(paginated: findAllQuery): Promise<MovieModel[]>: Finds movies by actor.

sortByPopularity(paginated: findAllQuery): Promise<MovieModel[]>: Sorts movies by their popularity.

calculatePopularity(movie: MovieModel): number: Calculates the popularity score of a movie.

calculateAverageRating(ratings: number[]): number: Calculates the average rating based on an array of ratings.

findSimilarMovies(paginated: findAllQuery): Promise<MovieModel[]>: Finds similar movies based on a given movie title and similarity threshold.

calculateSimilarityScore(movieA: MovieModel, movieB: MovieModel): number: Calculates the similarity score between two movie objects.

calculateGenreSimilarity(genresA: string[], genresB: string[]): number: Calculates the similarity score between two arrays of movie genres.

calculateCastSimilarity(castA: string[], castB: string[]): number: Calculates the similarity score between two arrays of movie cast members.

sortByDuration(paginated: findAllQuery): Promise<MovieModel[]>: Sorts movies by their duration.

sortByYear(paginated: findAllQuery): Promise<MovieModel[]>: Sorts movies by their release year.

sortByAttribute(paginated: findAllQuery, attribute: string, DTO): Promise<MovieModel[]>: Sorts movies by the specified attribute.

extractAttributeValue(movie: MovieModel, attribute: string): any: Extracts the value of the specified attribute from a movie object.

convertDurationToMinutes(duration: string): number: Converts a duration string to minutes.

## FIELDS

entityName: string: The name of the entity being stored in the repository.
jsonDataSource: JsonDataSource<MovieModel>: The data source used by the repository.
categoryFunctions: Record<string, Function>: A map of category names to functions that handle the corresponding category.

## USAGE EXAMPLE
const repository = new MoviesJsonRepository(jsonDataSource);

const allMovies = await repository.findAll({ page: 1, limit: 10 });
console.log(allMovies);

const movie = await repository.findByTitle("The Shawshank Redemption");
console.log(movie);

const moviesByActor = await repository.findByActor({ actor: "Tom Hanks", page: 1, limit: 10 });
console.log(moviesByActor);

const popularMovies = await repository.sortByPopularity({ page: 1, limit: 10 });
console.log(popularMovies);

const similarMovies = await repository.findSimilarMovies({ title: "Inception", threshold: 0.8, order: "desc", page: 1, limit: 10 });
console.log(similarMovies);

const moviesByDuration = await repository.sortByDuration({ order: "asc", page: 1, limit: 10 });
console.log(moviesByDuration);

const moviesByYear = await repository.sortByYear({ order: "desc", page: 1, limit: 10 });
console.log(moviesByYear);
