
## Movie Database Management Application
* This application is designed to manage a movie database stored in a JSON file. The database includes metadata for various movies such as title, genre(s), poster URL, year, cast (actors), duration, IMDB ratings, and viewer counters. The objective of this application is to categorize movies based on different criteria and provide functionality to create and navigate playlists for each category.

## Functionality
* Retrieving All Movies
```
The application retrieves all movies with pagination support.
Endpoint: /movies
Parameters:
page: Page number for pagination.
limit: Number of movies per page.
categorizeBy: Category by which to categorize the movies (popularity, actor, similarity, duration, year).
Response: An array of movie objects.

```
## Retrieving Movies by Title
```
The application finds a movie by its title.
Endpoint: /movies/title/:title
Parameters:
title: The title of the movie to find.
Response: The movie object with the specified title, or null if not found.

```
## Retrieving Movies by Actor
```
The application finds movies featuring a specific actor.
Endpoint: /movies/actor/:actor
Parameters:
actor: The name of the actor.
Response: An array of movie objects featuring the specified actor.
```
## Retrieving Movies by Popularity

```
The application sorts movies by their popularity, calculated based on rating, total ratings, and viewer count.
Endpoint: /movies/popularity
Parameters:
page: Page number for pagination.
limit: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by popularity.
```
## Finding Similar Movies
```
The application finds movies similar to a given movie based on genres, ratings, and cast.
Endpoint: /movies/similar/:title
Parameters:
title: The title of the movie to find similarities with.
threshold: The similarity threshold (value between 0 and 1).
order: Sorting order (asc or desc).
Response: An array of similar movie objects.
```
## Retrieving Movies by Duration
```

The application sorts movies by their duration.
Endpoint: /movies/duration
Parameters:
page: Page number for pagination.
limit: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by duration.
```
## Retrieving Movies by Year
```

The application sorts movies by their release year.
Endpoint: /movies/year
Parameters:
page: Page number for pagination.
limit: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by release year.
```
## Implementation Details
* The application is implemented using NestJS framework.
* Movies are stored in a JSON file and managed using a repository pattern.
* Various criteria such as popularity, similarity, duration, and year are used for categorizing and sorting movies.
* Pagination support is provided for retrieving large sets of movie data.
* Calculations for popularity, similarity, and average rating are performed based on predefined weights.
* Error handling is implemented for invalid requests or data formats.
## Setup
Clone the repository.
Install dependencies using yarn install.
Start the application using yarn start:dev.
Access the API endpoints using appropriate HTTP requests. You can use postman collection named: Movies.postman_collection.json.
Enjoy managing your movie database efficiently with this application!

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