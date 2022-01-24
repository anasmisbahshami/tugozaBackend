const models = require('../models/index');

exports.getAllBookingsByUser = (req, res) => {
    const userId = req.query.userId;
    models.booking.findAll({
        where: {
            userId
    }}).then(bookings => {
        res.status(200).json({message: 'Success', bookings});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};

exports.createUserBooking = (req, res) => {
    const { userId } = req.body;    
    if(!userId) {
        res.status(400).json({message: 'UserId is required'});
    }
    models.booking.create(req.body).then(booking => {
        res.status(200).json({message: 'Success', booking});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};

exports.deleteBooking = (req, res) => {
    const id = req.query.id;
    models.booking.destroy({
        where: {
            id
    }}).then(booking => {
        res.status(200).json({message: 'Success', booking});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};

exports.changeBookingStatusForUser = (req, res) => {
    const { id, status } = req.body;
    if(!id) {
        res.status(400).json({message: 'Id is required'});
    }
    if(!status) {
        res.status(400).json({message: 'Status is required'});
    }
    models.booking.update({
        status
    }, {
        where: {
            id
    }}).then(booking => {
        res.status(200).json({message: 'Success', booking});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};

exports.getAllBookingsByClient = (req, res) => {
    
    const { clientId , status} = req.query;
    models.booking.findAll({
        where: {
            clientId,
            status
    }}).then(bookings => {
        res.status(200).json({message: 'Success', bookings});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};
exports.getAllBookingsByStatus = (req, res) => {
    
    const {status} = req.query;
    models.booking.findAll({
        where: {
            status
    }}).then(bookings => {
        res.status(200).json({message: 'Success', bookings});
    }).catch(err => {
        res.status(500).json({message: 'Error', err});
    });
};
