const {findAllProductLines, insertProduct, findOneProduct, updateProduct, deleteProduct,
    findThreeFirstProductsOrderedByCount, findThreeFirstProductsOrderedByIncome,
    findProductsSoldForOneYearButNotForAnother
} = require("../services/product.service");

exports.getAllProductLines = async (req, res) => {
    try {
        const productLines = await findAllProductLines();
        res.status(200).json({success: true, data: productLines});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.createProduct = async (req, res) => {
    if (!req.body.productCode || !req.body.productName || !req.body.productLine || !req.body.productScale || !req.body.productVendor
        || !req.body.productDescription || !req.body.quantityInStock || !req.body.buyPrice || !req.body.MSRP) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing required parameters'}});
    }

    try {
        const result = await insertProduct(req.body);
        res.status(201).json({success: true, data: result});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to insert data'}});
    }
}

exports.updateProduct = async (req, res) => {
    if (!req.body) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing parameters'}});
    }

    try {
        const product = await findOneProduct(req.params.productId);
        if (!product[0]) res.status(404).json({success: false, error: {code: 404, message: 'Product not found'}});
        else {
            const result = await updateProduct(req.params.productId, req.body, product[0]);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to update data'}});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await findOneProduct(req.params.productId);
        if (!product[0]) res.status(404).json({success: false, error: {code: 404, message: 'Product not found'}});
        else {
            const result = await deleteProduct(req.params.productId);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to delete data'}});
    }
}

exports.getThreeFirstProductsOrderedByCount = async (req, res) => {
    try {
        const products = await findThreeFirstProductsOrderedByCount();
        res.status(200).json({success: true, data: products});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getThreeFirstProductsOrderedByIncome = async (req, res) => {
    try {
        const products = await findThreeFirstProductsOrderedByIncome();
        res.status(200).json({success: true, data: products});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getProductsSoldForOneYearButNotForAnother = async (req, res) => {
    try {
        const products = await findProductsSoldForOneYearButNotForAnother(req.params.soldYear, req.params.notSoldYear);
        res.status(200).json({success: true, data: products});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}