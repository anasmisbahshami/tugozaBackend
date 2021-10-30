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