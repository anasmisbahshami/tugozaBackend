const uuidV4 = require('uuid/v4');
module.exports = function (app) {
  const models = require('../models'); // eslint-disable-line
  app.set('sequelize', models.sequelize);
  app.set('models', models.sequelize.models);
  models.sequelize.sync()
    .then(() => {
      app.logger.info('Sequelize synced')
      models.user.count().then((data)=>{
        if(data === 0){
          models.user.create({
            id: uuidV4(),
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@gmail.com',
            password: '$2a$08$nGABkZZkpYk3VbH/zkrd8ezOjXT8tlihCxs2OOfdFcT4lhVy8Dsl2',
            emailConfirmed: true,
            isAdmin: true
          }).then(()=>{
            app.logger.info('Admin user created for new Db')
          }).catch((err)=>{
            app.logger.error(err);
          });
        }
      }).catch((err)=>{ app.logger.error(err); });
    })
    .catch((error) => {
      console.log(error);
      app.logger.error('Sequelize sync failed: ', error.message);
    });

}