const {findAllEmployees, findOneEmployee, findTwoEmployeesWithMostCustomers, findAllCustomerForEmployee,
    findTwoEmployeesWithMostConsumerCustomers, findAllEmployeesWhoReportToEmployee
} = require("../services/employee.service");

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await findAllEmployees();
        res.status(200).json({success: true, data: employees});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getOneEmployee = async (req, res) => {
    try {
        const employee = await findOneEmployee(req.params.employeeId);
        if (!employee[0]) res.status(404).json({success: false, error: {code: 404, message: 'Employee not found'}});
        else res.status(200).json({success: true, data: employee});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getAllCustomersForEmployee = async (req, res) => {
    try {
        const employee = await findOneEmployee(req.params.employeeId);
        if (!employee[0]) res.status(404).json({success: false, error: {code: 404, message: 'Employee not found'}});
        else {
            const customers = await findAllCustomerForEmployee(req.params.employeeId);
            res.status(200).json({success: true, data: customers});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getTwoEmployeesWithMostCustomers = async (req, res) => {
    try {
        const employees = await findTwoEmployeesWithMostCustomers();
        res.status(200).json({success: true, data: employees});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getTwoEmployeesWithMostConsumerCustomers = async (req, res) => {
    try {
        const employees = await findTwoEmployeesWithMostConsumerCustomers();
        res.status(200).json({success: true, data: employees});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getAllEmployeesWhoReportToEmployee = async (req, res) => {
    try {
        const employee = await findOneEmployee(req.params.employeeId);
        if (!employee[0]) res.status(404).json({success: false, error: {code: 404, message: 'Employee not found'}});
        else {
            const employees = await findAllEmployeesWhoReportToEmployee(req.params.employeeId);
            res.status(200).json({success: true, data: employees});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}