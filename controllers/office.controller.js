const {
    findAllOffices,
    countOffices,
    findAllEmployeesOfOffice,
    findOneOffice,
    insertOffice,
    updateOffice, deleteOffice
} = require("../services/office.service");

exports.getAllOffices = async (req, res) => {
    try {
        const offices = await findAllOffices();
        res.status(200).json({success: true, data: offices});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getOfficesCount = async (req, res) => {
    try {
        const officesCount = await countOffices();
        res.status(200).json({success: true, data: officesCount[0].nbOffices});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getAllEmployeesOfOffice = async (req, res) => {
    try {
        const office = await findOneOffice(req.params.officeId);
        if (!office[0]) res.status(404).json({success: false, error: {code: 404, message: 'Office not found'}});
        else {
            const employees = await findAllEmployeesOfOffice(req.params.officeId);
            res.status(200).json({success: true, data: employees});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.createOffice = async (req, res) => {
    if (!req.body.city || !req.body.phone || !req.body.addressLine1 || !req.body.country || !req.body.postalCode
        || !req.body.territory) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing required parameters'}});
    }

    try {
        const result = await insertOffice(req.body);
        res.status(201).json({success: true, data: result});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to insert data'}});
    }
}

exports.updateOffice = async (req, res) => {
    if (!req.body) {
        res.status(400).json({success: false, error: {code: 400, message: 'Missing parameters'}});
    }

    try {
        const office = await findOneOffice(req.params.officeId);
        if (!office[0]) res.status(404).json({success: false, error: {code: 404, message: 'Office not found'}});
        else {
            const result = await updateOffice(req.params.officeId, req.body, office[0]);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to update data'}});
    }
}

exports.deleteOffice = async (req, res) => {
    try {
        const office = await findOneOffice(req.params.officeId);
        if (!office[0]) res.status(404).json({success: false, error: {code: 404, message: 'Office not found'}});
        else {
            const result = await deleteOffice(req.params.officeId);
            res.status(200).json({success: true, data: result});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to delete data'}});
    }
}