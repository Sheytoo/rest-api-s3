const {generateQueryPromise} = require("../utils");

exports.findAllEmployees = () => {
    return generateQueryPromise(`SELECT *
                                 FROM employees`);
}

exports.findOneEmployee = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM employees
                                 WHERE employeeNumber = ?`, [id]);
}

exports.findAllCustomerForEmployee = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM customers
                                 WHERE salesRepEmployeeNumber = ?`, [id]);
}

exports.findTwoEmployeesWithMostCustomers = () => {
    return generateQueryPromise(`SELECT employees.*
                                 FROM employees
                                          INNER JOIN customers c on employees.employeeNumber = c.salesRepEmployeeNumber
                                 GROUP BY employeeNumber
                                 ORDER BY COUNT(*) DESC
                                 LIMIT 2`);
}

exports.findTwoEmployeesWithMostConsumerCustomers = () => {
    return generateQueryPromise(`SELECT employees.*
                                 FROM employees
                                          INNER JOIN customers c on employees.employeeNumber = c.salesRepEmployeeNumber
                                          INNER JOIN payments p on c.customerNumber = p.customerNumber
                                 GROUP BY employeeNumber
                                 ORDER BY SUM(DISTINCT amount) DESC
                                 LIMIT 2`);
}

exports.findAllEmployeesWhoReportToEmployee = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM employees
                                 WHERE reportsTo = ?`, [id]);
}