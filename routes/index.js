const authRouter = require('./auth');
const genreRouter = require('./genre');
module.exports = function (app) {
  app.use('/api/auth', authRouter);
  app.use('/api/genre', genreRouter);
};
