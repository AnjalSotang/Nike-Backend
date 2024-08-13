const express = require("express")
const {createWish, findWishById, deleteWish} = require("../controllers/wishlist");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()


router.post('/createWish/:id', checkTokenAndRole("user"), createWish);
router.get('/viewWish',checkTokenAndRole("user"), findWishById);
router.delete('/deleteWish/:id', checkTokenAndRole("user", deleteWish));

module.exports= router;
