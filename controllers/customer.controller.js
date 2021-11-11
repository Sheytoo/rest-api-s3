const {findAllCustomers, countCustomers, findOneCustomer, insertCustomer, updateCustomer, deleteCustomer,
    findLasOrderOfClient, findCustomersWithoutPayementsForYear
} = require("../services/customer.service");

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await findAllCustomers();
        res.status(200).json({success: true, data: customers});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getCustomersCount = async (req, res) => {
    try {
        const customersCount = await countCustomers();
        res.status(200).json({success: true, data: customersCount[0].nbCustomers});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getOneCustomer = async (req, res) => {
    try {
        const customer = await findOneCustomer(req.params.customerId);
        if (!customer[0]) res.status(404).json({success: false, error: {code: 404, message: 'Data not found'}});
        else res.status(200).json({success: true, data: customer});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.createCustomer = async (req, res) => {
    if (!req.body.customerName || !req.body.contactLastName || !req.body.contactFirstName || !req.body.phone
        || !req.body.addressLine1 || !req.body.city || !req.body.country) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing required parameters'}});
    }

    try {
        const result = await insertCustomer(req.body);
        res.status(201).json({success: true, data: result});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to insert data'}});
    }
}

exports.updateCustomer = async (req, res) => {
    if (!req.body) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing parameters'}});
    }

    try {
        const customer = await findOneCustomer(req.params.customerId);
        if (!customer[0]) res.status(404).json({success: false, error: {code: 404, message: 'Customer not found'}});
        else {
            const result = await updateCustomer(req.params.customerId, req.body, customer);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to update data'}});
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await findOneCustomer(req.params.customerId);
        if (!customer[0]) res.status(404).json({success: false, error: {code: 404, message: 'Customer not found'}});
        else {
            const result = await deleteCustomer(req.params.customerId);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to delete data'}});
    }
}

exports.getLastOrderOfClient = async (req, res) => {
    try {
        const customer = await findOneCustomer(req.params.customerId);
        if (!customer[0]) res.status(404).json({success: false, error: {code: 404, message: 'Customer not found'}});
        else {
            const order = await findLasOrderOfClient(req.params.customerId);
            res.status(200).json({success: true, data: order});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getCustomersWithoutPayementsForYear = async (req, res) => {
    try {
        const customers = await findCustomersWithoutPayementsForYear(req.params.year);
        res.status(200).json({success: true, data: customers});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}