const express = require('express');

const router = express.Router();

const cntrFilme = require('../controllers/filme.js');

router.get("/", cntrFilme.getAllFilme)

router.post("/", cntrFilme.createFilme);



module.exports = router;