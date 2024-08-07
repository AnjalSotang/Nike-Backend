const express = require("express")
const multer = require("multer")
const { createProduct, findAllProduct, updateProduct, productById, deleteProduct } = require("../controllers/product")
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()

//Defining the storage configuration for upload files using multer.diskStorage()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      return cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });


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