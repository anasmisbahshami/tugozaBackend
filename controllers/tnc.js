const models = require('../models/index');

exports.getAllTnc = (req, res) => {
  const limit = parseInt(
    req.query.limit !== undefined ? req.query.limit : 10,
    10
  ); // update these two line in all controllers
  const offset = parseInt(
    req.query.offset !== undefined ? req.query.offset : 0,
    10
  );
  models.tnc
    .findAll({ limit, offset })
    .then((data) =>
      res.status(200).send({
        status: 'success',
        data,
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: 'error',
        message: err.message,
      })
    );
};

exports.getTncById = (req, res) => {
  const id = parseInt(req.query.id, 10);
  models.tnc
    .findByPk(id)
    .then((data) =>
      res.status(200).send({
        status: 'success',
        data,
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: 'error',
        message: err.message,
      })
    );
};

exports.createTnc = (req, res) => {
  const { title } = req.body;
  models.tnc
    .create({
      title
    })
    .then((data) =>
      res.status(201).send({
        status: 'success',
        data,
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: 'error',
        message: err.message,
      })
    );
};

exports.updateTnc = (req, res) => {
  const { id, title } = req.body;
  models.tnc
    .update(
      { title } , {
        where: {
          id
        }
      }
    )
    .then((data) =>
      res.status(200).send({
        status: 'success',
        data,
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: 'error',
        message: err.message,
      })
    );
};

exports.deleteTnc = (req, res) => {
  const id = parseInt(req.query.id, 10);
  models.tnc
    .destroy({
      where: {
        id
      }
    })
    .then((data) =>
      res.status(200).send({
        status: 'success',
        data,
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: 'error',
        message: err.message,
      })
    );
};
