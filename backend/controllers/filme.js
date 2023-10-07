const serFilme = require('../services/filme.js');

async function getAllFilme(req, res) {
    serFilme.getAllFilme(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function createFilme(req, res) {
    console.log(req.body.data_vista)
    serFilme.createFilme(req.headers, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllFilme: getAllFilme,
    createFilme: createFilme
}