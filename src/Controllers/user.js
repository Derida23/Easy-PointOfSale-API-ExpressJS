const model = require('../Models/user')
const form = require('../Helpers/form')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 270400;

exports.registerUser = (req, res) => {
    if (req.body.username == null) return form.error(res, 400, "Username can't be empty");
    if (req.body.password == null) return form.error(res, 400, "Password can't be empty");

    model.registerUser(req).then(result => {
        form.success(res, 200, "User created successfully");
    }).catch(err => {
        form.error(res, err);
    })
}

exports.loginUser = (req, res) => {
    if (req.body.username == null) return form.error(res, 400, "Username can't be empty");
    if (req.body.password == null) return form.error(res, 400,"Password can't be empty");

    model.loginUser(req).then(result => {
        if(result.length != 0){
            if(bcrypt.compareSync(req.body.password, result[0].password)){
                const token = jwt.sign({id: result[0].id}, secretKey, {expiresIn: '3h'});
                form.success(res, {user_id: result[0].id, username: result[0].username, token: token});
            }else{
                form.error(res, 400, "Password incorrect")
            }
        }else{
            form.error(res, 400, "User not found")
        }
    })
}
