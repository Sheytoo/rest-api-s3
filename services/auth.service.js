const {generateQueryPromise} = require("../utils");

exports.findOneUserById = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM users
                                 WHERE id = ?`, [id]);
}

exports.findOneUserByEmail = (email) => {
    return generateQueryPromise(`SELECT *
                                 FROM users
                                 WHERE email = ?`, [email]);
}

exports.createUser = (data) => {
    return generateQueryPromise(`INSERT INTO users(firstName, lastName, email, password)
                                 VALUES (?, ?, ?, ?)`, [
        data.firstName,
        data.lastName,
        data.email,
        data.password
    ]);
}