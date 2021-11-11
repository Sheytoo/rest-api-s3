const {Router} = require('express');
const customerRoute = require('./customer.route');
const employeeRoute = require('./employee.route');
const officeRoute = require('./office.route');
const orderRoute = require('./order.route');
const productRoute = require('./product.route');
const paymentRoute = require('./payment.route');

const router = Router();

router.use('/customers', customerRoute);
router.use('/employees', employeeRoute);
router.use('/offices', officeRoute);
router.use('/orders', orderRoute);
router.use('/products', productRoute);
router.use('/payments', paymentRoute);

module.exports = router;