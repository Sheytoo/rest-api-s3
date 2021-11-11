const {Router} = require('express');
const {getAllProductLines, createProduct, updateProduct, deleteProduct, getThreeFirstProductsOrderedByCount,
    getThreeFirstProductsOrderedByIncome, getProductsSoldForOneYearButNotForAnother
} = require("../controllers/product.controller");

const router = Router();

router.get('/lines', getAllProductLines);
router.get('/three-first-products-ordered/by-count', getThreeFirstProductsOrderedByCount);
router.get('/three-first-products-ordered/by-income', getThreeFirstProductsOrderedByIncome);
router.get('/sold-year/:soldYear/not-sold-year/:notSoldYear', getProductsSoldForOneYearButNotForAnother);
router.post('/', createProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;