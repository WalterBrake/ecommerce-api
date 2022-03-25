# API-pagos


## DATABASE

You should create database in mysql


```bash
# use the database name of config file in /api/db/config or chngae it
$ create database ecommerce

```
## Build Setup

```bash
# install dependencies
$ yarn install

# Sequelize migration and population database

# move to folder sequelize
$ cd api/db
# migration comand - this will create the tables in db
$ npx sequelize db:migrate


# serve with hot reload at localhost:3000
$ yarn start
```


NEXT STEPT: Then run de FrontEdn app

