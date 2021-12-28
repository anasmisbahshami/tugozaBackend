const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const availability = sequelize.define('availability', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
    },
    dayOff:{
      type: Sequelize.STRING,
    },
    startTime: {
        type: Sequelize.TIME,
    },
    endTime: {
        type: Sequelize.TIME,
    },
    availability: {
        type: Sequelize.STRING,
    },
    userId: {
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
  return availability;
};
