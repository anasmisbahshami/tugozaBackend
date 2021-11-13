const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const tnc = sequelize.define('tnc', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.TEXT,
    },
  },
    {
      timestamps: true,
    });
  return tnc;
};
