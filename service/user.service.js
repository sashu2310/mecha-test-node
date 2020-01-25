const _ = require('lodash');
const bcrypt = require('bcrypt');
const utils = require('../utils/index');
const message = require('../utils/message');
const userModel = require('../models/user.model');

save = async (data) => {
    console.log('Saving to DB-');
    return new Promise(async (resolve, reject) => {
        let userData = new userModel(data);
        userData.save(async (error, response) => {
            if (error) {
                console.log("error", error);
                error = await utils.resolve(error);
                reject(error);
            }
            else {
                response = response.toJSON();
                resolve({ success: true, data: response });
            }
        });
    }).catch((error) => {
        return ({ success: false, error: error });
    });
};

login = async (cred) => {
    return new Promise(async (resolve, reject) => {
        const userName = cred['username'];
        let user = await userModel.findByCredentials(userName);
        console.log('got this user:: ', user);
        if (!_.isNull(user)) {
            bcrypt.compare(cred.password, user.password, (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(message.INCORRECT_USERNAME_PASSWORD_ERROR);
                }
                if (res) {
                    user = user.toJSON();
                    return resolve({ success: true, data: user });
                }
                else {
                    reject(message.INCORRECT_USERNAME_PASSWORD_ERROR);
                }
            });
        }
        else {
            reject(message.NOT_REGISTERED_USER);
        }
    }).catch((error) => {
        return ({ success: false, error: error });
    });

};

findUser = async (userName) => {
    console.log(userModel);
    // return new Promise((resolve, reject) => {
    //     userModel.findOne({ mobileNumber: userName }, (error, res) => {
    //         console.log(res);
    //     });
    // });
};

ifUserExists = async (userName) => {
    const user = await userModel.findByCredentials(userName);
    return user;
};

exports.save = save;
exports.login = login;
exports.ifUserExists = ifUserExists;