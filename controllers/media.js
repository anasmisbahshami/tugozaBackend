/* eslint-disable consistent-return */
const models = require('../models/index');

exports.getMediaByUserId = (req, res) => {
  const userId = req.query.userId;
  models.media
    .findAll({
      // to find all records matching the condition
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
  const url = req.file.location;
  if (!userId) {
    return res
      .status(400)
      .send({ status: 'error', message: 'userId is required' });
  }
  const body = req.body;
  body.url = url;
  models.media
    .create(body)
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.updateMedia = (req, res) => {
  const body = req.body;
  body.url = url;
  if (!body.userId) {
    return res.status(400).send({ status: 'error', message: 'id is required' });
  }
  models.media
    .update(body, {
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
  const id = req.query.Id;
  if (!id) {
    return res.status(400).send({ status: 'error', message: 'id is required' });
  }
  models.media
    .destroy({
      where: {
        id,
      },
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.changeMediaStatus = (req, res) => {
  const { id, status } = req.body;
  if (!id) {
    return res.status(400).send({ status: 'error', message: 'id is required' });
  }
  if (!status) {
    return res
      .status(400)
      .send({ status: 'error', message: 'status is required' });
  }
    models.media
      .update(
        { status },
      {
        where: {
          id,
        },
      }
      )
      .then((data) => res.status(200).send({ status: 'success', data }))
      .catch((err) =>
        res.status(500).send({ status: 'error', message: err.message })
      );
};

exports.getPendingMedia = (req, res) => {
  const limit = parseInt(
    req.query.limit !== undefined ? req.query.limit : 10,
    10
  ); // update these two line in all controllers
  const offset = parseInt(
    req.query.offset !== undefined ? req.query.offset : 0,
    10
  );
  models.media
    .findAll({
      where: {
        status: 'pending',
      },
      limit,
      offset,
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};

exports.getRejectedMedia = (req, res) => {
  const userId  = req.body.userId;
  const limit = parseInt(
    req.query.limit !== undefined ? req.query.limit : 10,
    10
  ); // update these two line in all controllers
  const offset = parseInt(
    req.query.offset !== undefined ? req.query.offset : 0,
    10
  );
  models.media
    .findAll({
      where: {
        userId,
        status: 'rejected',
      },
      limit,
      offset,
    })
    .then((data) => res.status(200).send({ status: 'success', data }))
    .catch((err) =>
      res.status(500).send({ status: 'error', message: err.message })
    );
};