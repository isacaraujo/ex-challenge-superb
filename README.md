# ex-challenge-superb

Superb full-stack engineer position challenge (nodejs)

# Pre-requisites

All of development environment run over dockers containers. The only pre-requiste is ensure you have installed:

- [docker-engine](https://docs.docker.com/engine/): 19.03
- [docker-compose](https://docs.docker.com/compose/install/): 1.25

# Get Started

Before start the server, ensure you have created all docker volumes in order to persist all mongo data. Otherwise all persisted data will be lost when you let your environment down.

```
$ docker volume create mongodbdata
$ docker volume create rabbitmqdata
```

Then, you will able to start the environment:

```
$ docker-compose up -d
```

Everytime you change the application (src/ dir), you must execute the typescript compiler:

```
$ docker-compose exec superb-api npm run build:prod
```

If you want to 'watch' all typescript changes and then reload the application, execute:

```
$ docker exec -it superb-api npm run build:dev
```

If you want to run the static analysis (eslint), execute:

```
$ docker-compose exec superb-api npm run eslint
```

If you want to run all unit tests, execute:

```
$ docker-compose exec superb-api npm run test:unit
```

**DISCLAIMER:** All pieces of the application (website, backoffice and api) were placed here, in a single repository, for the test proposes.

In a real scenario I would split each 'project' in a different repository. So, we would have:

- superb-api
- superb-website
- superb-backoffice
