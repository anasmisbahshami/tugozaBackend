const models = require('../models/index');


exports.getAllServices = (req, res) => {
    const limit = parseInt(req.query.limit !== undefined ? req.query.limit : 10, 10); //update these two line in all controllers
    const offset = parseInt(req.query.offset !== undefined ? req.query.offset : 0, 10);
    models.services
        .findAll({ limit, offset })
        .then((data) => res.status(200).json({
          status: 'success',
          data
        }))
        .catch((err) => res.status(500).send({
          message:
              err.message || 'Some error occurred while retrieving All clients.',
        })
      );
};

exports.getAllServicesById = (req, res) => {
    const id = parseInt(req.query.id, 10);
    if (!id) {
      return res.status(400).send({
        message: 'Service id can not be empty',
      });
    }
    models.services
        .findAll({
          where: {
            id,
          },
        })
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: `Service not found with id ${id}`,
            });
          }
          res.status(200).json({
            status: 'success',
            data,
          });
        })
        .catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: `Service not found with id ${id}`,
            });
          }
          return res.status(500).send({
            message: `Error retrieving Service with id ${id}`,
          });
        });
};

exports.createService = (req, res) => {

    const { type , duration, fee , userId} = req.body;
    if (!type || !duration || !fee || !userId) {
      return res.status(400).send({
        message: 'Service fields can not be empty',
      });
    }
    models.services
        .create(req.body)
        .then((data) => {
          res.status(201).json({
            status: 'success',
            data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
                err.message || 'Some error occurred while creating the Service.',
          });
        });
};

exports.updateService = (req, res) => {
    const id = parseInt(req.body.id, 10);
    const { type , duration, fee , userId } = req.body;
    models.services
          .findByPk(id)
          .then((data) => {
            if (!data) {
              return res.status(404).send({
                message: `Service not found with id ${id}`,
              });
            }
            data.type = type;
            data.duration = duration;
            data.fee = fee;
            data.userId = userId;
            data.save()
                  .then((result) => {
                    res.status(200).json({
                      status: 'success',
                      result,
                    });
                  })
                  .catch((err) => {
                    res.status(500).send({
                      message: `Error updating Service with id ${id}`,
                      error: err,
                    });
                  });
          })
          .catch((err) => {
            if (err.kind === 'ObjectId') {
              return res.status(404).send({
                message: `Service not found with id ${id}`,
              });
            }
            return res.status(500).send({
              message: `Error retrieving Service with id ${id}`,
            });
          });
};

exports.deleteService = (req, res) => {
    const id = parseInt(req.query.id, 10);
    models.services
          .findByPk(id)
          .then((data) => {
            if (!data) {
              return res.status(404).send({
                message: `Service not found with id ${id}`,
              });
            }
            data.destroy()
                  .then((result) => {
                    res.status(200).json({
                      status: 'success',
                      result,
                    });
                  })
                  .catch((err) => {
                    res.status(500).send({
                      message: `Error deleting Service with id ${id}`,
                      error: err,
                    });
                  });
          })
          .catch((err) => {
            if (err.kind === 'ObjectId' || err.title === 'NotFound') {
              return res.status(404).send({
                message: `Service not found with id ${id}`,
              });
            }
            return res.status(500).send({
              message: `Could not delete Service with id ${id}`,
            });
          });
};