const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const booking = sequelize.define('booking', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
        type: Sequelize.DATE,
      },
    startTime: {
        type: Sequelize.TIME,
    },
    endTime: {
        type: Sequelize.TIME,
    },
    status: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.STRING,
    },
    remarks: {
        type: Sequelize.STRING,
    },
    longitude: {
        type: Sequelize.STRING,
    },
    latitude: { 
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
        }
    },
    clientId: {
      type: Sequelize.STRING,
      references: {
        model: 'users', // 'fathers' refers to table name
        key: 'id', // 'id' refers to column name in fathers table
      }
  },
  },
    {
      timestamps: true,
    });
  return booking;
};
