const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const genre = sequelize.define('genre', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
    {
      timestamps: true,
    });
  return genre;
};
