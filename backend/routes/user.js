const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');

router.post("/", cntrUser.createUser);

module.exports = router