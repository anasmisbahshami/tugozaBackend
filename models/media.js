const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const media = sequelize.define(
    'media',
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
        }
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return media;
};
