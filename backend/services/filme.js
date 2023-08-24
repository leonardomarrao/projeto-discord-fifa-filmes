const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbFilme = require('../db/filme.js');

async function getAllFilme(headers) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;
        let promises = [];

        if(headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            dbFilme.getAllFilme().then(value2 => {
                info.filmes = value2;
                resolve({ code: 200, info: info });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: "backendQueryError" } });
            });


        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        });

    });

}

module.exports = {
    getAllFilme: getAllFilme
}