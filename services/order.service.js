const {generateQueryPromise} = require("../utils");

exports.findOneOrder = (id) => {
    return generateQueryPromise(`SELECT *
                                 FROM orders
                                 WHERE orderNumber = ?`, [id]);
}

exports.findAllProductsForOrder = (id) => {
    return generateQueryPromise(`SELECT products.*
                                 FROM products
                                          INNER JOIN orderdetails o on products.productCode = o.productCode
                                 WHERE orderNumber = ?`, [id]);
}

exports.insertOrder = (id, data) => {
    return generateQueryPromise(`INSERT INTO orders (orderNumber, orderDate, requiredDate, shippedDate, status, comments,
                                                     customerNumber)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            data.orderNumber,
            data.orderDate,
            data.requiredDate,
            data.shippedDate || null,
            data.status,
            data.comments || null,
            id
        ]);
}

exports.insertProductIntoOrder = (orderId, productId, data) => {
    return generateQueryPromise(`INSERT INTO orderdetails (orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber)
                                 VALUES (?, ?, ?, ?, ?)`,
        [
            orderId,
            productId,
            data.quantityOrdered,
            data.priceEach,
            data.orderLineNumber
        ]);
}

exports.deleteProductFromOder = (orderId, productId) => {
    return generateQueryPromise(`DELETE
                                 FROM orderdetails
                                 WHERE orderNumber = ?
                                   AND productCode = ?`, [orderId, productId]);
}

exports.updateProductQuantityFromOrder = (orderId, productId, data) => {
    return generateQueryPromise(`UPDATE orderdetails
                                 SET quantityOrdered = ?
                                 WHERE orderNumber = ?
                                   AND productCode = ?`,
        [
            data.quantityOrdered,
            orderId,
            productId
        ]);
}