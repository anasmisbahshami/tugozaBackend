const models = require('../models/index');

exports.markUnAvailable = (req, res) => {
    const {date , startTime, endTime, userId , availability } = req.body;
    if(!date || !startTime || !endTime || !userId || !availability){
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    models.availability.create(req.body).then((data) => {
        res.status(200).json({message: 'success' , data } );
    }).catch((err) => {
        res.status(500).send({ status: 'error', message: err.message });
    });
};

exports.getUserUnAvailability = (req, res) => {
    const { userId } = req.query;
    models.availability.findAll({
        where: {
            userId: userId
        }
    }).then((data) => {
        res.status(200).json({message: 'success' , data });
    }).catch((err) => {
        res.status(500).send({ status: 'error', message: err.message });
    });
};

exports.removeUnAvailability = (req, res) => {
    const { id } = req.query;
    models.availability.destroy({
        where: {
            id
        }
    }).then((data) => {
        res.status(200).json({message: 'success' , data });
    }).catch((err) => {
        res.status(500).send({ status: 'error', message: err.message });
    });
};