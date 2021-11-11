const {generateQueryPromise} = require("../utils");

exports.findAllOffices = () => {
    return generateQueryPromise(`SELECT *
                                 FROM offices`);
}

exports.countOffices = () => {
    return generateQueryPromise(`SELECT COUNT(*) AS nbOffices
                                 FROM offices`);
}

exports.findOneOffice = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM offices
                                 WHERE officeCode = ?`, [id]);
}

exports.findAllEmployeesOfOffice = (id) => {
    return generateQueryPromise(`SELECT employees.*
                                 FROM employees
                                          INNER JOIN offices o on employees.officeCode = o.officeCode
                                 WHERE o.officeCode = ?`, [id])
}

exports.insertOffice = (data) => {
    return generateQueryPromise(`INSERT INTO offices (city, phone, addressline1, addressLine2, state, country,
                                                      postalCode, territory)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.city,
            data.phone,
            data.addressLine1,
            data.addressLine2 || null,
            data.state || null,
            data.country,
            data.postalCode,
            data.territory
        ]);
}

exports.updateOffice = (id, data, prevData) => {
    return generateQueryPromise(`UPDATE offices
                                 SET city         = ?,
                                     phone        = ?,
                                     addressLine1 = ?,
                                     addressLine2 = ?,
                                     state        = ?,
                                     country      = ?,
                                     postalCode   = ?,
                                     territory    = ?
                                 WHERE officeCode = ?`,
        [
            data.city || prevData.city,
            data.phone || prevData.phone,
            data.addressLine1 || prevData.addressLine1,
            data.addressLine2 || prevData.addressLine2,
            data.state || prevData.state,
            data.country || prevData.country,
            data.postalCode || prevData.postalCode,
            data.territory || prevData.territory,
            id
        ]);
}

exports.deleteOffice = (id) => {
    return generateQueryPromise(`DELETE
                                 FROM offices
                                 WHERE officeCode = ?`, [id]);
}