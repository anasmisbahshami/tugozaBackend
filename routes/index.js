const authRouter = require('./auth');
const genreRouter = require('./genre');
const tncRouter = require('./tnc');
module.exports = function (app) {
  app.use('/api/auth', authRouter);
  app.use('/api/genre', genreRouter);
  app.use('/api/tnc', tncRouter);
};
