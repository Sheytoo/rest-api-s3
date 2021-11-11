const {pool} = require("./config/db.config");

exports.generateQueryPromise = (query, args) => {
    return new Promise((resolve, reject) => {
        pool.query(query, args, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
}