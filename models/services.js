const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const services = sequelize.define('services', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
    },
    duration: {
        type: Sequelize.INTEGER,
    },
    fee: {
        type: Sequelize.INTEGER,
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
  return services;
};
