const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    accessToken: {
      type: Sequelize.STRING,
    },
    refreshToken: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    emailConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    emailConfirmationToken: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordTokenExpiration: {
      type: Sequelize.DATE
    },
    isAdmin: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    dormantUser: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  }, {
    timestamps: true,
  });
  return user;
};
