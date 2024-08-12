const express = require("express")
const {createCart, viewCart, deleteCart} = require("../controllers/cart");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()


router.post('/createWish/:id', checkTokenAndRole("user"), createCart);
router.get('/viewWish',checkTokenAndRole("user"), viewCart);
router.delete('/deleteWish/:id', checkTokenAndRole("user", deleteCart));

module.exports= router;

