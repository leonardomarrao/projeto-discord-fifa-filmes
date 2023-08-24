const serUser = require('../services/user.js');

async function createUser(req, res) {
    serUser.createUser(req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    createUser: createUser
}