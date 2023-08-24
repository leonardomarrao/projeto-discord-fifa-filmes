const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const rtUser = require('./routes/user.js');
const rtAuth = require('./routes/auth.js');
const rtFilme = require('./routes/filme.js')

app.use("/api/user", rtUser);
app.use("/api/auth", rtAuth);
app.use("/api/filme", rtFilme)

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));