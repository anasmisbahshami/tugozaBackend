# Nodejs Express Mysql Sequelize NORSA Backend

Database - MySQL (Setup local or test instance for development use, setup in AWS RDS for prod)
Framework - nodejs (express, pm2) - Run with pm2 to manage uptime/restarts/long term deploys

## Getting Setup
Setup nodejs and mysql.

## Requirements
* [NodeJs](https://nodejs.org) >= 8.x 
* [Mysql](https://www.mysql.com/) >= 8.x

## Install

```sh
$ git clone https://github.com/neat-soft/node-express-mysql-sequelize.git
$ npm install
$ sudo npm install -g pm2
$ sudo pm2 start pm2.json
```
## Run
```sh
$ npm start
```

## Apis
| URL                               | methods   | middlewares   |
| --------------------------------- | --------- | -------------- |
| *                                 | OPTIONS   | corsMiddleware |
| /api/auth/signup                  | POST      | NO      |
| /api/auth/login                   | POST      | NO      |
| /api/auth/logout                  | GET       | NO      |
| /api/auth/verification-email      | POST      | NO      |
| /api/auth/confirm-email           | GET       | NO      |
| /api/auth/forgot-password         | POST      | NO      |
| /api/auth/reset-password          | POST      | NO      |
| /api/auth/change-password         | POST      | NO      |
| /api/auth/validate-reset-password | POST      | NO      |
| /api/auth/refresh-session         | POST      | NO      |
| /api/auth/getUserByRole           | POST      | TokkenValidation      |
| /api/auth/updateUser           | POST      | TokkenValidation      |
| /api/auth/confirmEmailOauth           | GET      | TokkenValidation      |
| /api/auth/updateUserProfile           | PUT      | TokkenValidation      |
| /api/genre/getAllGenres                | GET       | TokkenValidation      |
| /api/genre/getAllGenres                | GET       | TokkenValidation      |
| /api/genre/getGenreById                | GET       | TokkenValidation      |
| /api/genre/createGenre                 | POST      | TokkenValidation      |
| /api/genre/updateGenre                 | POST      | TokkenValidation      |
| /api/genre/deleteGenre                 | DELETE    | TokkenValidation      |
| /api/tnc/getAllTnc  | GET       | TokkenValidation     |
| /api/tnc/getTncById | GET       | TokkenValidation     |
| /api/tnc/createTnc  | POST      | TokkenValidation     |
| /api/tnc/updateTnc  | PUT       | TokkenValidation     |
| /api/tnc/deleteTnc  | DELETE    | TokkenValidation     |
| /api/media/getMediaByUserId | GET       | TokkenValidation     |
| /api/media/getAllMedia      | GET       | TokkenValidation     |
| /api/media/createMedia      | POST      | TokkenValidation     |
| /api/media/changeMediaStatus      | POST      | TokkenValidation     |
| /api/media/updateMedia      | PUT       | TokkenValidation     |
| /api/media/deleteMedia      | DELETE    | TokkenValidation     |
| /api/media/getPendingMedia      | POST    | TokkenValidation     |
| /api/media/getRejectedMedia      | POST    | TokkenValidation     |
| /api/availability/getUserUnAvailability | GET       | TokkenValidation     |
| /api/availability/markUnAvailable       | POST      | TokkenValidation     |
| /api/availability/removeUnAvailability  | DELETE    | TokkenValidation     |
| /api/booking/getAllBookingsByUser       | GET       | TokkenValidation     |
| /api/booking/createUserBooking          | POST      | TokkenValidation     |
| /api/booking/deleteBooking              | DELETE    | TokkenValidation     |
| /api/booking/changeBookingStatusForUser | POST      | TokkenValidation     |
| /api/booking/getAllBookingsByClient     | POST      | TokkenValidation     |
| /api/services/getAllServices            | GET       | TokkenValidation     |
| /api/services/getAllServicesById        | GET       | TokkenValidation     |
| /api/services/createService             | POST      | TokkenValidation     |
| /api/services/updateService             | PUT       | TokkenValidation     |
| /api/services/deleteService             | DELETE    | TokkenValidation     |