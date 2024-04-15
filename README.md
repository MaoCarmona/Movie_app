
## Movie Database Management Application
* This application is designed to manage a movie database stored in a JSON file. The database includes metadata for various movies such as title, genre(s), poster URL, year, cast (actors), duration, IMDB ratings, and viewer counters. The objective of this application is to categorize movies based on different criteria and provide functionality to create and navigate playlists for each category.

## Functionality
## Retrieving All Movies
```
The application retrieves all movies with pagination support.
Endpoint: /movies
Parameters:
page: Page number for pagination.
take: Number of movies per page.
orderBy: order by which to order the movies .
Response: An array of movie objects.

```
## Retrieving Movies by Title
```
The application finds a movie by its title.
Endpoint: /movies/title?title=*****
Parameters:
title: The title of the movie to find.
Response: The movie object with the specified title, or null if not found.

```
## Retrieving Movies by Actor
```
The application finds movies featuring a specific actor.
Endpoint: /movies/actor?actor=Reese Huxley
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
take: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by popularity.
```
## Finding Similar Movies
```
The application finds movies similar to a given movie based on genres, ratings, and cast.
Endpoint: /movies/similarity?title=****
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
take: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by duration.
```
## Retrieving Movies by Year
```

The application sorts movies by their release year.
Endpoint: /movies/year
Parameters:
page: Page number for pagination.
take: Number of movies per page.
order: Sorting order (asc or desc).
Response: An array of movie objects sorted by release year.
```
## Implementation Details
* The application is implemented using the NestJS framework, but the folder structure follows the hexagonal architecture provided by the author.
* Movies are stored in a JSON file and managed using a repository pattern.
* Various criteria such as popularity, similarity, duration, and year are used for categorizing and sorting movies.
* Pagination support is provided for retrieving large sets of movie data. 
    * Function, 'paginatedResponse', takes an array and a pagination object as inputs and returns a subset of the array based on the pagination parameters. 
    * Inputs
        * array: An array of any type.
        * paginated: An object containing the pagination parameters page and take.
    * Flow
        * Destructure the page and take properties from the paginated object.
        * Calculate the startIndex by multiplying the page with the take value.
        * Calculate the endIndex by adding the startIndex with the take value.
        * Return a new array that is a subset of the original array, using the slice method with the startIndex and endIndex as arguments.
    * Outputs
        * A new array that contains a subset of the original array based on the pagination parameters.
* The calculations for popularity, similarity, and average rating are performed based on predefined weights, ranging from 0 to 1, where a weight of 0.5 carries the highest significance. The weight of 0.3 represents a middle significance, while the weight of 0.2 signifies the lowest significance in the calculation process. These weights determine the percentage contribution of each factor to the final score, with the weight of 0.5 having the highest importance and the weights of 0.3 and 0.2 distributing the remaining significance accordingly.
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