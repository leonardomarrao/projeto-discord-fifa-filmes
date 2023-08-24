const sql = require("mssql");

const config = {
    user: process.env.DBUSER,
    password: process.env.DBPW,
    server: process.env.DBHOST,
    database: process.env.DBNAME,
    trustServerCertificate: true,
    encrypt: true
};

sql.connect(config, function (err) {
    if (err) throw err;
});

async function authenticateUser(username, password) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        pool.input('username', sql.VarChar(50), username).query(`SELECT * FROM [User] WHERE [username] = @username`, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createToken(token) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO [Refresh_Token] ([token]) VALUES ('${token}')`, (err, res) => {
            if (!err) {
                resolve('Token stored with success.');
            } else {
                reject(err.message);
            }
        });
    });
}

async function checkToken(token) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM [Refresh_Token] WHERE [token] = '${token}'`, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function deleteToken(token) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM [Refresh_Token] WHERE [token] = '${token}'`, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    authenticateUser: authenticateUser,
    createToken: createToken,
    checkToken: checkToken,
    deleteToken: deleteToken
}