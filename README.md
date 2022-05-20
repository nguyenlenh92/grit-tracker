# Run the projects the in following order

## Database
1. cd ./database
2. docker build -t [NAME] ./
3. docker run -d --name [container name] -p 5431:5432 [image name]
4. More information is located in database folder README.

## Backend
1. cd ./back-end
2. npm ci
3. npm run start
4. npx sequelize db:seed:all

## Frontend
1. cd ./front-end
2. npm ci
3. npm run start

## REITERATING ON HOW TO IMPORT DATA INTO OUR DATABASE
1. Build docker image with the docker file using : docker build -t [IMAGE-NAME] ./
2. Run docker image with port 5431 facing towards host machine: docker run -d --name [CONTAINER-NAME] -p 5431:5432 [IMAGE-NAME]
3. cd ./back-end
4. Install all dependencies of nodeJS using npm ci (or npm install)
5. Run back-end server: npm run start
6. When the server runs, it should synchronize our data model objects to database as well as applying any relational associations.
7. When the server finishes setting up and begins listening to port 5001, while in back-end directory, do the following: npx sequelize db:seed:all -> this will seed the database with initial data using the .js files located in seeds folder.
8. To access the database do: docker -exec -it [CONTAINER] /bin/bash
9. Open up a psql shell: psql -U postgres
10. You're in the database now, you can navigate to our database with : \c grit-tracker-db
11. More informations on psql commands are located in README in database directory.

## NOTE:
1. If you choose to import database tables + associations + contents, the sql dump is located in ./database/grit-tracker-db-20220509.sql