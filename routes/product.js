const express = require("express")
const { createProduct, findAllProduct, updateProduct, productById, deleteProduct } = require("../controllers/product")
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const upload = require("../middleware/upload"); // Import the upload middleware
const router = express.Router()




//Create Product ko api
router.post('/createProduct', upload.array("image", 4), checkTokenAndRole("admin"), createProduct);

//Single Product Ko API
router.get('/productById/:id', productById);

//Find All Product KO api
router.get('/findAllProduct', findAllProduct);

//Update Product Ko API
router.patch('/updateProduct/:id', upload.array("image", 4), checkTokenAndRole("admin"), updateProduct);

//Delete Product KO API
router.delete('/deleteProduct/:id', checkTokenAndRole("admin"), deleteProduct);

module.exports = router;