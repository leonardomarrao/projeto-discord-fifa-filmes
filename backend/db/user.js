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

async function createUser(id, user) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const insrt = `INSERT INTO [User] ([id_user], [username], [password], [tipo], [email], [nome]) 
        VALUES (@id, @username, @password, 'user', @email, @nome)`;
        pool.input('id', sql.VarChar(200), id).input('username', sql.VarChar(50), user.username).input('password', sql.VarChar(200), user.password)
        .input('email', sql.VarChar(70), user.email).input('nome', sql.VarChar(70), user.nome).query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isUsernameTaken(username) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User] WHERE [username] = @username`;
        pool.input('username', sql.VarChar(50), username).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

async function getAllIDs() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT [id_user] FROM [User]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

module.exports = {
    createUser: createUser,
    isUsernameTaken: isUsernameTaken,
    getAllIDs: getAllIDs
}