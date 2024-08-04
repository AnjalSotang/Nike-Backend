const express = require("express")
const multer = require("multer")
const {findProfileById, updateProfile} = require("../controllers/profile");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()

//Defining the storage configuration for upload files using multer.diskStorage()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
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


router.post('/updateProfile', upload.single("image"), checkTokenAndRole("user"), updateProfile);
router.get('/findProfile',checkTokenAndRole("user"), findProfileById);

module.exports= router;

