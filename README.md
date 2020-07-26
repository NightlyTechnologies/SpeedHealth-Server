# SpeedHealth API

## Requirements

### Using Docker

- Docker
- Docker-compose

### Using locally

- NodeJS
- npm or yarn
- Postgres Instance

## Getting Started

### Initial Configuration

1 - Install dependencies with ```yarn``` or ```npm i```.

2 - Rename files with _.example_ extension, as _.env.example_ and _ormconfig.example.yml_.

3 - Change environment variables of .env file for your use.

4 - Configure _ormconfig.yml_ to connect with your postgres instance. [Help](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-ormconfigyml)

5 - Run [migrations](https://github.com/SpeedHealth/Server#migrations).

6 - Run locally using ```yarn dev``` or ```yarn start```.

**Warning: ```yarn start``` just works after [build](https://github.com/SpeedHealth/Server#build)!**

### Using Docker

- To start containers use command ```docker-compose up -d```.

- To stop containers use command ```docker-compose down```.

- To restart containers use command ```docker-compose restart```.

- To access postgres cli use ```docker exec -it postgres psql -U database_user -W database_name```.

- To access node container logs use ```docker logs -f server```.

## Build

To build project, use command ```yarn build```, it will create _dist_ directory that have javascript code.

**Remember to reconfigure paths in conf files.**

## Tests

To run tests use ```yarn test```.
If you want to create a coverage report use ```yarn test:coverage```.

## Migrations

- To run migrations use ```yarn typeorm <connection_name> migration:run```.

- To revert migrations use ```yarn typeorm <connection_name> migration:revert```.
