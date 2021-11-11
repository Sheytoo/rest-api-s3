const {Router} = require('express');
const {getAllOffices, getOfficesCount, getAllEmployeesOfOffice, createOffice, updateOffice, deleteOffice} = require("../controllers/office.controller");

const router = Router();

router.get('/', getAllOffices);
router.get('/count', getOfficesCount);
router.get('/:officeId/employees', getAllEmployeesOfOffice);
router.post('/', createOffice);
router.patch('/:officeId', updateOffice);
router.delete('/:officeId', deleteOffice);

module.exports = router;