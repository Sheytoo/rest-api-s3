const {Router} = require('express');
const {getAllEmployees, getOneEmployee, getAllCustomersForEmployee, getTwoEmployeesWithMostCustomers,
    getTwoEmployeesWithMostConsumerCustomers, getAllEmployeesWhoReportToEmployee
} = require("../controllers/employee.controller");

const router = Router();

router.get('/', getAllEmployees);
router.get('/two-with-most/customers', getTwoEmployeesWithMostCustomers);
router.get('/two-with-most/consumer-customers', getTwoEmployeesWithMostConsumerCustomers);
router.get('/:employeeId', getOneEmployee);
router.get('/:employeeId/customers', getAllCustomersForEmployee);
router.get('/:employeeId/employees', getAllEmployeesWhoReportToEmployee);

module.exports = router;