const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');
const randomString = require('randomstring');
const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models/index');
const validator = require('../utils/validator');
const mailer = require('../services/sendgrid.mail.service');
const EmailTemplateService = require('../services/email.template.service');
const passport = require('passport');
const reduceUserData = require('../utils/reduceUserData');
const reduceErrorMessage = require('../utils/reduceErrorMessage');
const {all} = require('underscore');

models.user.hasMany(models.media);

/**
 * confirm email
 * @param {*} req
 * @param {*} res
 */
exports.confirmEmail = (req, res) => { // var email = req.query.email;
    const {token} = req.query;
    if (!token || token === '') {
        return res.status(400).send({result: 'error', message: 'Please input email code.'});
    }
    models.user.findOne({
        where: {
            emailConfirmationToken: token
        }
    }).then((user) => {
        if (user) {
            if (user.emailConfirmed) {
                return res.status(200).send({result: 'ok', message: 'Email already confirmed'});
            }
            // confirm action
            user.update({emailConfirmed: true, emailConfirmationToken: null});

            const text = EmailTemplateService.getRenderedTemplate('email-confirmation', {project: config.app.project});
            mailer.send({to: user.email, from: config.email.from.support, subject: 'Email verified', html: text}).then(() => {
                console.log('Mail sent successfully');
            }).catch(err => {
                console.log('Mail send error: ', err);
            });
            return res.status(200).send({result: 'ok', message: 'Email verified. Your account is active now'});
        }
        return res.status(400).send({result: 'error', message: 'Invalid email confirm code'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 400, message: err.toSting()});
    });
};

/**
 * Forgot password, get forgot password link into email
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = (req, res) => {
    const {email} = req.body;
    if (!email || email === '') {
        return res.status(400).json({result: 'error', message: 'Please insert email address'});
    }
    models.user.findOne({
        where: {
            email: email
        
        }
    }).then((found) => {
        if (!found) 
            return res.status(400).json({result: 'error', message: 'not found user with your email'});
        

        const resetPasswordToken = randomString.generate(6);
        const resetPasswordTokenExpiration = moment().add(config.RESET_PASSWORD_EXPIRATION, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        found.update({resetPasswordToken, resetPasswordTokenExpiration});
        const text = EmailTemplateService.getRenderedTemplate('forgot-password', {
            code: resetPasswordToken,
            project: config.app.project
        });
        mailer.send({to: email, from: config.email.from.support, subject: 'Forgot password', html: text}).catch(err => {
            console.log('mail send error: ', err);
        });
        return res.status(200).send({result: 'ok', message: 'We sent reset password token to your email.'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'error', message: reduceErrorMessage(err)});
    });
};

exports.resetPassword = (req, res) => {
    const {email, resetPasswordToken, newPassword} = req.body;
    if (!email || email === '') {
        return res.status(400).send({result: 'error', message: 'Please insert email address'});
    }
    const emailValidation = validator.isValidEmail(email);
    if (! emailValidation.valid) {
        return res.status(400).send({result: 'error', message: emailValidation.reason});
    }
    if (!newPassword || newPassword === '') {
        return res.status(400).send({result: 'error', message: 'Please insert new password!'});
    }

    const passwordValidation = validator.isValidPassword(newPassword);
    if (! passwordValidation.valid) {
        return res.status(400).send({result: 'error', message: passwordValidation.reason});
    }
    if (!resetPasswordToken || resetPasswordToken === '') {
        return res.status(400).send({result: 'error', message: 'Reset password token is empty'});
    }
    return models.user.findOne({
        where: {
            email:email
        }
    }).then((found) => {
        if (!found) 
            return res.status(400).send({result: 'error', message: 'not found user with your email'});
        
        if (found.resetPasswordToken !== resetPasswordToken) {
            return res.status(400).send({result: 'error', message: 'Reset password token is invalid'});
        }
        if (!found.resetPasswordTokenExpiration || (moment().isAfter(found.resetPasswordTokenExpiration))) {
            return res.status(400).send({result: 'error', message: 'Reset password token is expired'});
        }
        // generate new pwd
        const generateHash = (password) => (bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
        found.update({password: generateHash(newPassword)});

        const text = EmailTemplateService.getRenderedTemplate('reset-password', {project: config.project});
        mailer.send({to: email, from: config.email.from.support, subject: 'New password', html: text}).catch(err => {
            console.log('mail send error: ', err);
        });

        return res.json({result: 'ok', message: 'Password changed'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'ok', message: reduceErrorMessage(err)});
    });
};

exports.changePassword = (req, res) => {
    if (!req.user || !req.user.id || req.user.id === '') {
        return res.status(400).json({result: 'error', message: 'Invalid User. Please login again'});
    }
    const {newPassword} = req.body;
    if (!newPassword || newPassword === '') {
        return res.status(400).send({result: 'error', message: 'Please insert new password!'});
    }
    const passwordValidation = validator.isValidPassword(newPassword);
    if (! passwordValidation.valid) {
        return res.status(400).send({result: 'error', message: passwordValidation.reason});
    }

    return models.user.findOne({
        where: {
            id: req.user.id
        }
    }).then((user) => {
        if (!user) 
            return res.status(400).send({result: 'error', message: 'not found user with your email'});
        
        // generate new pwd
        const generateHash = (password) => (bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
        user.update({password: generateHash(newPassword)});

        const text = EmailTemplateService.getRenderedTemplate('reset-password', {project: config.project});
        mailer.send({to: user.email, from: config.email.from.support, subject: 'New password', html: text}).catch(err => {
            console.log('mail send error: ', err);
        });

        return res.json({result: 'ok', message: 'Password changed'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'ok', message: reduceErrorMessage(err)});
    });
};


exports.validateResetPassword = (req, res) => {
    const {email, resetPasswordToken} = req.body;
    if (!email || email === '') {
        return res.status(400).send({result: 'error', message: 'Please insert email address'});
    }
    const emailValidation = validator.isValidEmail(email);
    if (! emailValidation.valid) {
        return res.status(400).send({result: 'error', message: emailValidation.reason});
    }
    if (!resetPasswordToken || resetPasswordToken === '') {
        return res.status(400).send({result: 'error', message: 'Reset password token is empty'});
    }
    return models.user.findOne({
        where: {
            email:email
        }
    }).then((found) => {
        if (!found) 
            return res.status(400).send({result: 'error', message: 'not found user with your email'});
        
        if (found.resetPasswordToken !== resetPasswordToken) {
            return res.status(400).send({result: 'error', message: 'Reset password token is invalid'});
        }
        if (!found.resetPasswordTokenExpiration || (moment().isAfter(found.resetPasswordTokenExpiration))) {
            return res.status(400).send({result: 'error', message: 'Reset password token is expired'});
        }

        return res.json({result: 'ok'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'ok', message: reduceErrorMessage(err)});
    });
};
exports.refreshSession = async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken || refreshToken === '') {
        return res.status(400).send({result: 'error', message: 'refresh token is empty'});
    }
    try {
        const {secret} = config.app;
        const payload = await jwt.verify(refreshToken, secret);
        const userQuery = {
            where: {
                id: payload.id
            }
        };
        const user = await models.user.findOne(userQuery);
        if (! user) {
            throw new Error('Not found user with your refresh token');
        }
        if (! user || user.id === '') {
            return res.status(400).send({result: 'error', message: 'Not found user with your refresh token'});
        }
        const accessToken = jwt.sign({
            id: payload.id,
            email: payload.email
        }, secret, {
            expiresIn: 60 * 30 // expires in 30 min
        });
        const newRefreshToken = jwt.sign({
            id: payload.id,
            email: payload.email
        }, secret, {
            expiresIn: '30d' // expires in 30 days
        });
        user.update({access_token: accessToken, refresh_token: newRefreshToken}).then(() => {
            const userData = {
                access_token: accessToken,
                refresh_token: newRefreshToken
            };
            return res.status(200).json({result: 'ok', data: userData});
        }).catch(err => {
            console.log('Error while update access token for login', err);
            return res.status(400).json({result: 'ok', message: 'Error in login'});
        });
    } catch (error) {
        console.log('Error in refresh token');
        return res.status(403).send({result: 'error', message: reduceErrorMessage(error)});
    }
};
exports.verificationEmail = async (req, res) => {
    const {email} = req.body;
    const emailValidation = validator.isValidEmail(email);
    if (! emailValidation.valid) {
        return res.status(400).send({result: 'error', message: emailValidation.reason});
    }
    const user = await models.user.findOne({attributes: ['id'], where: {
            email
        }});
    if (! user || user.id === '') {
        return res.status(400).send({result: 'error', message: 'Not found user with your email'});
    }
    const emailConfirmationToken = randomString.generate(6);
    user.update({emailConfirmationToken}).then(async () => {
        const link = `${
            config.app.project
        }://auth/confirm-email?token=${emailConfirmationToken}`;
        const text = await EmailTemplateService.renderHtmlTemplate('register', {
            link,
            code: emailConfirmationToken,
            project: config.app.project
        });

        mailer.send({to: email, from: config.email.from.support, subject: 'Please active your account', html: text}).then(() => {
            console.log('Resent email verification code');
            return res.json({result: 'ok', data: 'We sent email verification link to your email.'});
        }).catch(err => {
            console.log('mail send error: ', err);
            return res.status(400).send({result: 'error', message: 'Error in sending email verification code'});
        });
    }).catch(err => {
        console.log('Error while update access token for login', err);
        return res.status(400).send({result: 'error', message: 'Error while update user'});
    });
};

exports.getUserByRole = (req, res) => {
    const {role} = req.body;
    models.user.findAll({where: {
            role
        }}).then(data => {
        return res.json({result: 'ok', data});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'error', message: reduceErrorMessage(err)});
    });
};

exports.updateUser = (req, res) => {
    const {id} = req.body;
    let filePath = '';
    if(req.file){
        filePath = req.file.location ? req.file.location: '';
      }
      console.log(filePath);
      const body = req.body;
      body.profilePicture = filePath;
    models.user.update(req.body, {where: {
            id
        }}).then(() => res.json({result: 'ok', message: 'User updated'})).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'error', message: reduceErrorMessage(err)});
    });
};

exports.getUserById = async (req, res) => {
    const {id} = req.body;
    models.user.findOne({where: {
            id
        }}).then(async data => {
        let genreSet = new Set();
        const newData = {};
        const userId = data.id;
        const allMedia = await models.media.findAll({where: {
                userId
            }});

        allMedia.map(async (media) => {
            const genreId = media.genreId;
            const allGenre = await models.genre.findAll({where: {
                    genreId
                }});

            allGenre.map((genre) => {
                genreSet.add(genre.genre);
            });
        });
        newData['data'] = data;
        newData['genre'] = genreSet;
        newData['media'] = allMedia;
        return res.json({result: 'ok', newData});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'error', message: reduceErrorMessage(err)});
    });
};
exports.getOnlyMediaUsers = async (req, res) => { /*const allusers = await models.user.findAll({attributes: ["id","email", "firstName","lastName","profilePicture","dob","contactNo","address1","address2"]},{
    where: {
      role:'Artist'
    }
  });
  var finalData = [];
  Promise.all(allusers.map(async (user) => {
    const newData = [];
    const userData = user.dataValues;
    const userId = userData.id;
    let genreSet = [];
    const mediaCount = await models.media.findAll({ // this will return only video records so i can count that 
      where: {userId,type:'video'}
    });
    if(!mediaCount||mediaCount.length==0){
      return res.status(400).send({ result: 'error', message: 'Not found media' });
    }
    const allMedia = await models.media.findAll({
      where: {userId}
    });
    newData['media'] = allMedia.map(async (media) => {
      const currentMedia = media.dataValues;
      const genreId = currentMedia.genreId; 
      const allGenre = await models.genre.findAll({
        where: {id:genreId}
      });
      allGenre.map((element) => {
        const genre = element.dataValues;
        genreSet.push(genre.title);
      });
       return currentMedia;
    });
    newData['genre'] = genreSet;

    newData['data']= userData;
    finalData.push(newData);
})).then(() => {
  return res.json({ result: 'ok', finalData });
}).catch(err => {
  console.log(err);
  return res.status(400).send({ result: 'error', message: err });
});*/

models.sequelize
  .query(
    `SELECT u.id as userId, u.email AS email, u.firstName AS firstName,u.lastName AS lastName,
  u.profilePicture AS profilePicture , u.dob AS dob, u.address1 AS address1, u.address2 AS address2, 
  u.about AS about, m.id AS mediaId , m.title AS mediaTitle, m.description AS mediaDescription, m.url AS url,
  m.type AS 'type' , m.status AS 'status', g.id AS genreId , g.title AS genreTitle
  FROM users u
  left JOIN media m ON u.id = m.userId
  left JOIN genres g ON m.genreId = g.id
  WHERE (SELECT COUNT(*) FROM media m 
  WHERE m.type = 'video' AND m.userId  = u.id)>0
  `
  ,{type:models.sequelize.QueryTypes.SELECT})
  .then((data) => {
    const newArray = [];
    let count = 0;
    const idsArray = [];
    data.map((user) => {

        const media = {
            genreId:user.genreId,
            genreTitle:user.genreTitle,
            mediaDescription: user.mediaDescription,
            mediaId: user.mediaId,
            mediaTitle: user.mediaTitle,
            status: user.status,
            type: user.type,
            url: user.url };
            if(!newArray.hasOwnProperty(idsArray[user.userId])){
                idsArray[user.userId] = count++;
                const userData = {
                    userId: user.userId,
                    profilePicture: user.profilePicture,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    email: user.email,
                    dob: user.dob,
                    address2: user.address2,
                    address1: user.address1,
                    about: user.about };
                newArray[idsArray[user.userId]] = {
                    userData: userData,
                    media: []
                };
                newArray[idsArray[user.userId]].media.push(media);
            }
            else {
                newArray[idsArray[user.userId]].media.push(media);
            }
    });
    return res.json({ result: "ok",  data:newArray });
  })
  .catch((err) => {
    res.status(500).json({ message: "Error", err });
  });
};

exports.updateUserProfile = (req, res) => {
    const {id} = req.body;
    let filePath = '';
    if(req.file){
      filePath = req.file.location ? req.file.location: '';
    }
    const body = req.body;
    body.profilePicture = filePath;
    models.user.update(req.body, {where: {
            id
        }}).then(() => res.json({result: 'ok', message: 'User updated'})).catch(err => {
        console.log(err);
        return res.status(400).send({result: 'error', message: reduceErrorMessage(err)});
    });
};
exports.confirmEmailOauth = (req, res) => { // var email = req.query.email;
    const {email} = req.query;
    models.user.findOne({where: {
            email
        }}).then((user) => {
        if (user) { // confirm action
            user.update({emailConfirmed: true, emailConfirmationToken: null});
            return res.status(200).send({result: 'ok', message: 'Email verified. Your account is active now'});
        }
        return res.status(400).send({result: 'error', message: 'User Does Not Exist'});
    }).catch(err => {
        console.log(err);
        return res.status(400).send({result: 400, message: err.toSting()});
    });
};
