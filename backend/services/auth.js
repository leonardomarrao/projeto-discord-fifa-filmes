const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const bcrypt = require('bcrypt');

const dbAuth = require('../db/auth.js');

async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username == "" || password == "") {
            reject({ code: 400, error: { message: 'usernamePasswordEmpty' }});
        } else {
            dbAuth.authenticateUser(username).then(async value => {
                try {
                    if (value.length == 0) {
                        reject({ code: 401, error: { message: 'usernamePasswordInvalid' } });
                    } else {
                        if (await bcrypt.compare(password, value[0].password)) {
                            let user = { id_user: value[0].id_user, username: value[0].username, tipo: value[0].tipo, tipo: value[0].tipo };
                            let access_token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '240m' });
                            let refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);
                            dbAuth.createToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
                                resolve({ code: 201, info: { user: user, access_token: access_token, refresh_token: refresh_token } });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: 'backendQueryError' } });
                            });
                        } else {
                            reject({ code: 400, error: { message: 'usernamePasswordInvalid' } });
                        }
                    }
                } catch {
                    reject({ code: 400, error: { message: 'backendQueryError' } });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: 'backendQueryError' } });
            });
        }
    });
}

async function logout(refresh_token) {
    return new Promise((resolve, reject) => {
        dbAuth.deleteToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
            if (value.rowsAffected[0] == 0) {
                reject({ code: 401, error: { message: 'invalidToken' } });
            } else {
                resolve({ code: 200 });
            }
        })
        .catch(error => {
            reject({ code: 400, error: { message: 'backendQueryError' } });
            console.log(error);
        });
    });
}

module.exports = {
    login: login,
    logout: logout
}