const {generateQueryPromise} = require('../utils');

exports.findAllProductLines = () => {
    return generateQueryPromise(`SELECT *
                                 FROM productlines`);
}

exports.findOneProduct = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM products
                                 WHERE productCode = ?`, [id]);
}

exports.insertProduct = (data) => {
    return generateQueryPromise(`INSERT INTO products (productCode, productName, productLine, productScale,
                                                       productVendor, productDescription, quantityInStock, buyPrice,
                                                       MSRP)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.productCode,
            data.productName,
            data.productLine,
            data.productScale,
            data.productVendor,
            data.productDescription,
            data.quantityInStock,
            data.buyPrice,
            data.MSRP
        ]);
}

exports.updateProduct = (id, data, prevData) => {
    return generateQueryPromise(`UPDATE products
                                 SET productName        = ?,
                                     productLine        = ?,
                                     productScale       = ?,
                                     productVendor      = ?,
                                     productDescription = ?,
                                     quantityInStock    = ?,
                                     buyPrice           = ?,
                                     MSRP               = ?
                                 WHERE productCode = ?`,
        [
            data.productName || prevData.productName,
            data.productLine || prevData.productLine,
            data.productScale || prevData.productScale,
            data.productVendor || prevData.productVendor,
            data.productDescription || prevData.productDescription,
            data.quantityInStock || prevData.quantityInStock,
            data.buyPrice || prevData.buyPrice,
            data.MSRP || prevData.MSRP,
            id
        ]);
}

exports.deleteProduct = (id) => {
    return generateQueryPromise(`DELETE
                                 FROM products
                                 WHERE productCode = ?`, [id]);
}

exports.findThreeFirstProductsOrderedByCount = () => {
    return generateQueryPromise(`SELECT products.*
                                 FROM products
                                          INNER JOIN orderdetails o on products.productCode = o.productCode
                                 GROUP BY o.productCode
                                 ORDER BY SUM(quantityOrdered) DESC
                                 LIMIT 3`);
}

exports.findThreeFirstProductsOrderedByIncome = () => {
    return generateQueryPromise(`SELECT products.*
                                 FROM products
                                          INNER JOIN orderdetails o on products.productCode = o.productCode
                                 GROUP BY o.productCode
                                 ORDER BY SUM(quantityOrdered * priceEach) DESC
                                 LIMIT 3`);
}

exports.findProductsSoldForOneYearButNotForAnother = (soldYear, notSoldYear) => {
    return generateQueryPromise(`SELECT products.*
                                 FROM products
                                          INNER JOIN orderdetails o on products.productCode = o.productCode
                                          INNER JOIN orders o2 on o.orderNumber = o2.orderNumber
                                 WHERE YEAR(orderDate) = ?
                                   AND o.productCode IN (SELECT o3.productCode
                                                         FROM orderdetails o3
                                                                  INNER JOIN orders o4 on o3.orderNumber = o4.orderNumber
                                                         WHERE YEAR(o4.orderDate) != ?)`, [soldYear, notSoldYear]);
}