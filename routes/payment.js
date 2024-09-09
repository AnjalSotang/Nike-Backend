const express = require("express")
const { payment } = require("../controllers/payment")
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()

router.post('/charge', checkTokenAndRole("user"), payment);

module.exports = router;