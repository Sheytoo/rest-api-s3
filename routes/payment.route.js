const {Router} = require('express');
const {getBestMonthPaymentForYear, getPaymentsForDate, getTotalPaymentsBetweenYears,
    getTotalPaymentsBetweenMonthsOfYear
} = require("../controllers/payment.controller");

const router = Router();

router.get('/year/:year/best-month', getBestMonthPaymentForYear);
router.get('/date/:date', getPaymentsForDate);
router.get('/between-years/:firstYear/:secondYear', getTotalPaymentsBetweenYears);
router.get('/year/:year/between-months/:firstMonth/:secondMonth', getTotalPaymentsBetweenMonthsOfYear);

module.exports = router;