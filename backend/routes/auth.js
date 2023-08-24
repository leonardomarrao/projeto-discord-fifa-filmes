const express = require('express');

const router = express.Router();

const cntrAuth = require('../controllers/auth.js');

router.post("/login", cntrAuth.login);

router.delete("/logout", cntrAuth.logout);

module.exports = router