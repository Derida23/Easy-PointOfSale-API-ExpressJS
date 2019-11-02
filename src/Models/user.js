const conn = require('../Configs/connect');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.registerUser = req => {
    const body = req.body
    const pass = bcrypt.hashSync(body.password, salt);
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO user SET username = ?, password = ?`,
            [body.username, pass],
            (err, result) => {
                if(!err) resolve(result);
                else reject(err);
            });
    });
}

exports.loginUser = req => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM user WHERE username = ?`, [req.body.username],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        })
    })
}
