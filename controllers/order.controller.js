const {findOneOrder, findAllProductsForOrder, insertProductIntoOrder, deleteProductFromOder,
    updateProductQuantityFromOrder
} = require("../services/order.service");

exports.getAllProductsForOrder = async (req, res) => {
    try {
        const order = await findOneOrder(req.params.orderId);
        if (!order[0]) res.status(404).json({success: false, error: {code: 404, message: 'Order not found'}});
        else {
            const produtcs = await findAllProductsForOrder(req.params.orderId);
            res.status(200).json({success: true, data: produtcs});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.addProductInOrder = async (req, res) => {
    if (!req.body.quantityOrdered || !req.body.priceEach || !req.body.orderLineNumber) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing required parameters'}});
    }

    try {
        const order = await findOneOrder(req.params.orderId);
        if (!order[0]) res.status(404).json({success: false, error: {code: 404, message: 'Order not found'}});
        else {
            const result = await insertProductIntoOrder(req.params.orderId, req.params.productId, req.body);
            res.status(201).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to insert data'}});
    }
}

exports.deleteProductFromOrder = async (req, res) => {
    try {
        const order = await findOneOrder(req.params.orderId);
        if (!order[0]) res.status(404).json({success: false, error: {code: 404, message: 'Order not found'}});
        else {
            const result = await deleteProductFromOder(req.params.orderId, req.params.productId);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to delete data'}});
    }
}

exports.updateProductQuantityFromOrder = async (req, res) => {
    if (!req.body.quantityOrdered) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing required parameters'}});
    }

    try {
        const order = await findOneOrder(req.params.orderId);
        if (!order[0]) res.status(404).json({success: false, error: {code: 404, message: 'Order not found'}});
        else {
            const result = await updateProductQuantityFromOrder(req.params.orderId, req.params.productId, req.body);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to update data'}});
    }
}