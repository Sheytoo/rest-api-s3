const {generateQueryPromise} = require("../utils");

exports.findAllCustomers = () => {
    return generateQueryPromise(`SELECT *
                                 FROM customers`);
}

exports.countCustomers = () => {
    return generateQueryPromise(`SELECT COUNT(*) AS nbCustomers
                                 FROM customers`);
}

exports.findOneCustomer = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM customers
                                 WHERE customerNumber = ?`, [id]);
}

exports.insertCustomer = (data) => {
    return generateQueryPromise(`INSERT INTO customers (customerName, contactLastName, contactFirstName, phone,
                                                        addressLine1, addressLine2, city, state, postalCode, country,
                                                        salesRepEmployeeNumber, creditLimit)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.customerName,
            data.contactLastName,
            data.contactFirstName,
            data.phone,
            data.addressLine1,
            data.addressLine2 || null,
            data.city,
            data.state || null,
            data.postalCode || null,
            data.country,
            data.salesRepEmployeeNumber || null,
            data.creditLimit || null
        ]);
}

exports.updateCustomer = (id, data, prevData) => {
    return generateQueryPromise(`UPDATE customers
                                 SET customerName           = ?,
                                     contactLastName        = ?,
                                     contactFirstName       = ?,
                                     phone                  = ?,
                                     addressLine1           = ?,
                                     addressLine2           = ?,
                                     city                   = ?,
                                     state                  = ?,
                                     postalCode             = ?,
                                     country                = ?,
                                     salesRepEmployeeNumber = ?,
                                     creditLimit            = ?
                                 WHERE customerNumber = ?`,
        [
            data.customerName || prevData.customerName,
            data.contactLastName || prevData.contactLastName,
            data.contactFirstName || prevData.contactFirstName,
            data.phone || prevData.phone,
            data.addressLine1 || prevData.addressLine1,
            data.addressLine2 || prevData.addressLine2,
            data.city || prevData.city,
            data.state || prevData.state,
            data.postalCode || prevData.postalCode,
            data.country || prevData.country,
            data.salesRepEmployeeNumber || prevData.salesRepEmployeeNumber,
            data.creditLimit || prevData.creditLimit,
            id
        ]);
}

exports.deleteCustomer = (id) => {
    return generateQueryPromise(`DELETE
                                 FROM customers
                                 WHERE customerNumber = ?`, [id]);
}

exports.findLasOrderOfClient = (id) => {
    return generateQueryPromise(`SELECT orders.*
                                 FROM orders
                                 WHERE customerNumber = ?
                                 ORDER BY orderDate DESC
                                 LIMIT 1`, [id]);
}

exports.findCustomersWithoutPayementsForYear = (year) => {
    return generateQueryPromise(`SELECT customers.*
                                 FROM customers
                                 WHERE customers.customerNumber NOT IN (
                                     SELECT customers.customerNumber
                                     FROM customers
                                              INNER JOIN payments p on customers.customerNumber = p.customerNumber
                                     WHERE YEAR(p.paymentDate) = ?
                                     GROUP BY customers.customerNumber
                                 )`, [year]);
}