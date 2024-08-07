const express = require("express")
const {createWish, findWishById, findAllWish, updateWish, deleteWish} = require("../controllers/wishlist");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()


router.post('/createWish', checkTokenAndRole("user"), createWish);
router.get('/viewUserWish',checkTokenAndRole("user"), findWishById);
router.get('/viewWishes',checkTokenAndRole("admin"), findAllWish);
router.update('/createWish', checkTokenAndRole("user"), updateWish);
router.delete('/deleteWish', checkTokenAndRole("user", deleteWish))

module.exports= router;

