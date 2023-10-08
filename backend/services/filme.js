const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbFilme = require('../db/filme.js');

async function getAllFilme(headers) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

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

async function createFilme(headers, filme) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            dbFilme.getAllIDs().then(async value2 => {
                let id;
                let existe;
                do {
                    id = uuid.v4();
                    existe = false;
                    value2.forEach(i => {
                        if (i.id == id) existe = true;
                    });
                } while (existe)

                filme.id_user = value.user.id_user

                if(filme.data_vista == null) {
                    let data = new Date().toLocaleDateString();
                    let dias = data.split('/')[0];
                    let mes = data.split('/')[1];
                    let ano = data.split('/')[2];
                    horas = new Date().getHours();
                    minutos = new Date().getMinutes();
                    segundos = new Date().getSeconds();
                    horario = horas + ':' + minutos + ':' + segundos;
                    filme.data_vista = mes + '-' + dias + '-' + ano + ' ' + horario;
                }

                dbFilme.createFilme(id, filme).then(value3 => {
                    resolve({ code: 201, info: info });
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "backendQueryError" } });
                    });
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
    getAllFilme: getAllFilme,
    createFilme: createFilme
}