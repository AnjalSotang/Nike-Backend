const express = require("express")
const {createWish, findWishById, deleteWish} = require("../controllers/wishlist");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()


router.post('/createWish', checkTokenAndRole("user"), createWish);
router.get('/viewWish',checkTokenAndRole("user"), findWishById);
router.delete('/deleteWish', checkTokenAndRole("user", deleteWish));

module.exports= router;

