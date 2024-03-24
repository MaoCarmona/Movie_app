## Installation and Running
## You need install nodejs and yarn before run following commands
```bash
$ yarn install
$ nest start --watch
```

## You need install Docker Daemon before run followin commands
#Docker
```sh 
docker build -t movie_app -f docker/app.dockerfile --no-cache .

docker run -d -p 3002:3002 --name movie_app_container movie_app

```

