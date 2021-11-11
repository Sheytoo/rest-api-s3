const {generateQueryPromise} = require("../utils");

exports.findBestMonthPaymentForYear = (year) => {
    return generateQueryPromise(`SELECT MONTH(paymentDate) as month
                                 FROM payments
                                 WHERE YEAR(paymentDate) = ?
                                 GROUP BY month
                                 ORDER BY SUM(amount) DESC, month
                                 LIMIT 1`, [year]);
}

exports.findPaymentsForDate = (date) => {
    return generateQueryPromise(`SELECT SUM(amount) as total
                                 FROM payments
                                 WHERE paymentDate = ?`, [date]);
}

exports.findTotalPaymentsBetweenYears = (firstYear, secondYear) => {
    return generateQueryPromise(`SELECT SUM(amount) as total
                                 FROM payments
                                 WHERE YEAR(paymentDate) >= ?
                                   AND YEAR(paymentDate) <= ?`, [firstYear, secondYear]);
}

exports.findTotalPaymentsBetweenMonthsOfYear = (year, firstMonth, secondMonth) => {
    return generateQueryPromise(`SELECT SUM(amount) as total
                                 FROM payments
                                 WHERE YEAR(paymentDate) = ?
                                   AND (MONTH(paymentDate) >= ? AND MONTH(paymentDate) <= ?)`,
        [year, firstMonth, secondMonth]
    );
}