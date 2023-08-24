const serAuth = require('../services/auth.js');

async function login(req, res){
    serAuth.login(req.body.username, req.body.password).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function logout(req, res){
    serAuth.logout(req.headers.refreshtoken).then(value => {
        res.status(value.code).send();
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    login: login,
    logout: logout
}