const config = {
  app: {
    port: 3000,
    project: 'node-express-mysql-sequelize-demo-app',
    url: 'http://localhost:3000/api',
    secret: 'asdfasfasdfasdafsdf231243243234234234234234234234',
  },
  db: {
    host: 'localhost',
    database: 'tugoza',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: 'false',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
  },
  sendgrid: {
    apiKey: ''
  } 
}
module.exports = config;