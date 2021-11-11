const {Router} = require('express');
const {getAllProductsForOrder, addProductInOrder, deleteProductFromOrder, updateProductQuantityFromOrder} = require("../controllers/order.controller");

const router = Router();

router.get('/:orderId/products', getAllProductsForOrder);
router.post('/:orderId/products/:productId', addProductInOrder);
router.delete('/:orderId/products/:productId', deleteProductFromOrder);
router.patch('/:orderId/products/:productId/quantity', updateProductQuantityFromOrder);

module.exports = router;