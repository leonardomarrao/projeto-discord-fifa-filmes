const dbUser = require('../db/user.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const utils = require('../utils/index.js');

async function createUser(user) {
    return new Promise((resolve, reject) => {
        if (user.username != null && user.nome != null && user.password != null) {
            dbUser.isUsernameTaken(user.username).then(async value => {
                if (value.length == 0) {
                    dbUser.getAllIDs().then(async value2 => {
                        let id;
                        let existe;
                        do {
                            id = uuid.v4();
                            existe = false;
                            value2.forEach(i => {
                                if (i.id == id) existe = true;
                            });
                        } while (existe)
                        user.password = await bcrypt.hash(user.password, 10);
                        dbUser.createUser(id, user).then(value => {
                            resolve({ code: 201, info: { message: "User registrado com sucesso." } });
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
                } else {
                    reject({ code: 400, error: { message: 'usernameTaken' } });
                }
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: 'backendQueryError' } });
                });
        } else {
            reject({ code: 400, error: { message: 'emptyFields' } });
        }
    })
}

module.exports =  {
    createUser: createUser
}