/* eslint-disable consistent-return */
const models = require('../models/index');

exports.getMediaByUserId = (req, res) => {
  const userId = req.query.userId;
  models.media
    .find({
      where: {
        userId,
      },
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.getAllMedia = (req, res) => {
  const limit = parseInt(
    req.query.limit !== undefined ? req.query.limit : 10,
    10
  ); // update these two line in all controllers
  const offset = parseInt(
    req.query.offset !== undefined ? req.query.offset : 0,
    10
  );
  models.media
    .findAll({ limit, offset })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.createMedia = (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .send({ status: 'error', message: 'userId is required' });
  }
  models.media
    .create(req.body)
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.updateMedia = (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ status: 'error', message: 'id is required' });
  }
  models.media
    .update(req.body, {
      where: {
        userId,
      },
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

// eslint-disable-next-line consistent-return
exports.deleteMedia = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ status: 'error', message: 'id is required' });
  }
  models.media
    .destroy({
      where: {
        userId,
      },
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};