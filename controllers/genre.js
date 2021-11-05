const models = require('../models/index');


exports.getAllGenres = (req, res) => {
  const limit = parseInt(req.query.limit !== undefined ? req.query.limit : 10, 10); //update these two line in all controllers
  const offset = parseInt(req.query.offset !== undefined ? req.query.offset : 0, 10);
  models.genre
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

exports.getGenreById = (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (!id) {
    return res.status(400).send({
      message: 'Genre id can not be empty',
    });
  }
  models.genre
      .findByPk(id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Genre not found with id ${id}`,
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
            message: `Genre not found with id ${id}`,
          });
        }
        return res.status(500).send({
          message: `Error retrieving genre with id ${id}`,
        });
      });
};
exports.createGenre = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({
      message: 'Genre title can not be empty',
    });
  }
  models.genre
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
              err.message || 'Some error occurred while creating the Genre.',
        });
      });
};
exports.updateGenre = (req, res) => {
  const id = parseInt(req.body.id, 10);
  const { title } = req.body;
  models.genre
        .findByPk(id)
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: `Genre not found with id ${id}`,
            });
          }
          data.title = title;
          data.save()
                .then((result) => {
                  res.status(200).json({
                    status: 'success',
                    result,
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message: `Error updating Genre with id ${id}`,
                    error: err,
                  });
                });
        })
        .catch((err) => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: `Genre not found with id ${id}`,
            });
          }
          return res.status(500).send({
            message: `Error retrieving genre with id ${id}`,
          });
        });
};
exports.deleteGenre = (req, res) => {
  const id = parseInt(req.query.id, 10);
  models.genre
        .findByPk(id)
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: `Genre not found with id ${id}`,
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
                    message: `Error deleting Genre with id ${id}`,
                    error: err,
                  });
                });
        })
        .catch((err) => {
          if (err.kind === 'ObjectId' || err.title === 'NotFound') {
            return res.status(404).send({
              message: `Genre not found with id ${id}`,
            });
          }
          return res.status(500).send({
            message: `Could not delete Genre with id ${id}`,
          });
        });
};
