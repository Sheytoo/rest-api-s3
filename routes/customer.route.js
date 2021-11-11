const {Router} = require('express');
const {getAllCustomers, getOneCustomer, getCustomersCount, createCustomer, updateCustomer, deleteCustomer,
    getLastOrderOfClient, getCustomersWithoutPayementsForYear
} = require("../controllers/customer.controller");

const router = Router();

router.get('/', getAllCustomers);
router.get('/count', getCustomersCount);
router.get('/:customerId', getOneCustomer);
router.get('/:customerId/last-order', getLastOrderOfClient);
router.get('/without-payments/year/:year', getCustomersWithoutPayementsForYear);
router.post('/', createCustomer);
router.patch('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

module.exports = router;