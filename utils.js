const {pool} = require("./config/db.config");
const bcrypt = require('bcrypt');

exports.generateQueryPromise = (query, args) => {
    return new Promise((resolve, reject) => {
        pool.query(query, args, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
}

exports.generatePasswordHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

exports.isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}