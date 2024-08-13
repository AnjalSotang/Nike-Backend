const express = require("express")
const { register, login, user_forgotPassword, resetPassword} = require("../controllers/auth")
const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/forget', user_forgotPassword);
router.post('/reset', resetPassword)

module.exports= router;