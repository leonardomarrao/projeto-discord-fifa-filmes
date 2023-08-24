const express = require('express');

const router = express.Router();

const cntrFilme = require('../controllers/filme.js');

router.get("/", cntrFilme.getAllFilme)

module.exports = router;