const express = require("express")
const {findProfileById, updateProfile} = require("../controllers/profile");
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const upload = require("../middleware/upload"); // Import the upload middleware
const router = express.Router()


router.post('/updateProfile', upload.single("image"), checkTokenAndRole("user"), updateProfile);
router.get('/findProfile',checkTokenAndRole("user"), findProfileById);

module.exports= router;

