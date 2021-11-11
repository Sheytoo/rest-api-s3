const {findBestMonthPaymentForYear, findPaymentsForDate, findTotalPaymentsBetweenYears,
    findTotalPaymentsBetweenMonthsOfYear
} = require("../services/payment.service");

exports.getBestMonthPaymentForYear = async (req, res) => {
    try {
        const month = await findBestMonthPaymentForYear(req.params.year);
        res.status(200).json({success: true, data: month});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getPaymentsForDate = async (req, res) => {
    try {
        const payements = await findPaymentsForDate(req.params.date);
        res.status(200).json({success: true, data: payements});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getTotalPaymentsBetweenYears = async (req, res) => {
    try {
        const totalPayements = await findTotalPaymentsBetweenYears(req.params.firstYear, req.params.secondYear);
        res.status(200).json({success: true, data: totalPayements});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}

exports.getTotalPaymentsBetweenMonthsOfYear = async (req, res) => {
    try {
        const totalPayements = await findTotalPaymentsBetweenMonthsOfYear(req.params.year, req.params.firstMonth, req.params.secondMonth);
        res.status(200).json({success: true, data: totalPayements});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, error: {code: 500, message: 'Unable to fetch data'}});
    }
}