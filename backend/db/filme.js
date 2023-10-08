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

async function getAllFilme() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Filme]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createFilme(id, filme) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const insrt = `INSERT INTO [Filme] (id_filme, nome, data_lancamento, data_vista, nota, sinopse, genero, poster, id_user_add) 
        VALUES (@id_filme, @nome, @data_lancamento, @data_vista, @nota, @sinopse, @genero, @poster, @id_user)`;
        pool.input('id_filme', sql.VarChar(200), id).input('nome', sql.VarChar(100), filme.nome).input('data_lancamento', sql.DateTime, filme.data_lancamento).input('data_vista', sql.DateTime, filme.data_vista).input('nota', sql.Float, filme.nota).input('sinopse', sql.VarChar(400), filme.sinopse).input('genero', sql.VarChar(50), filme.genero)
        .input('id_user', sql.VarChar(200), filme.id_user).input('poster', sql.VarBinary, Buffer.from(filme.poster)).query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllIDs() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT [id_filme] FROM [Filme]`;
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
    getAllFilme: getAllFilme,
    createFilme: createFilme,
    getAllIDs: getAllIDs
}