const authRouter = require('./auth');
const genreRouter = require('./genre');
const tncRouter = require('./tnc');
const mediaRouter = require('./media');
const availabilityRouter = require('./availability');
const bookingRouter = require('./booking');
const servicesRouter = require('./services');
module.exports = function (app) {
  app.use('/api/auth', authRouter);
  app.use('/api/genre', genreRouter);
  app.use('/api/tnc', tncRouter);
  app.use('/api/media', mediaRouter);
  app.use('/api/availability', availabilityRouter);
  app.use('/api/booking', bookingRouter);
  app.use('/api/services', servicesRouter);


};
