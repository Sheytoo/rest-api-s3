const {Router} = require('express');
const {getAllProductsForOrder, addProductInOrder, deleteProductFromOrder, updateProductQuantityFromOrder,
    createOrderForCustomerWithProducts
} = require("../controllers/order.controller");

const router = Router();

router.get('/:orderId/products', getAllProductsForOrder);
router.post('/:orderId/products/:productId', addProductInOrder);
router.delete('/:orderId/products/:productId', deleteProductFromOrder);
router.patch('/:orderId/products/:productId/quantity', updateProductQuantityFromOrder);
router.post('/customers/:customerId/insert-products', createOrderForCustomerWithProducts);

module.exports = router;