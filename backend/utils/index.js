const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const dbAuth = require('../db/auth.js');

async function validateToken(access_token, refresh_token){
    return new Promise((resolve, reject) => {
        jwt.verify(access_token, process.env.ACCESS_SECRET, (error, user) => {
            if(error){
                reject(error);
            } else {
                refreshToken({id_user: user.id_user, username: user.username, tipo: user.tipo, tipo: user.tipo}, refresh_token).then(value => resolve({user: {id_user: user.id_user, username: user.username, tipo: user.tipo, tipo: user.tipo}, access_token: value}))
                .catch(error => {
                    resolve({user: {id_user: user.id_user, username: user.username, tipo: user.tipo, tipo: user.tipo}});
                });
            }
        });
    });
}

async function refreshToken(user, refresh_token){
    return new Promise((resolve, reject) => {
        dbAuth.checkToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
            if(value == 0) {
                reject({code: 401, message: "Token inválido."});
            } else {
                let access_token = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '600m'});
                resolve(access_token);
            }
        })
        .catch(error => {
            reject({code: 400, message: "Algo correu mal com a query."});
        });
    });
}

module.exports = {
    validateToken: validateToken,
    refreshToken: refreshToken
}