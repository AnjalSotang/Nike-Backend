const express = require("express")
const {createCart, viewCart, deleteCart} = require("../controllers/cart");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()


router.post('/createCart/:id', checkTokenAndRole("user"), createCart);
router.get('/viewCart',checkTokenAndRole("user"), viewCart);
router.delete('/deleteCart/:id', checkTokenAndRole("user", deleteCart));

module.exports= router;

