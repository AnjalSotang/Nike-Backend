const express = require("express")
const { createCategory, findAllCategory, updateCategory, deleteCategory} = require("../controllers/category")
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()

router.post('/createCategory', checkTokenAndRole("admin"), createCategory);
router.get('/findAllCategory', findAllCategory);
router.patch('/updateCategory', checkTokenAndRole("admin"), updateCategory);
router.delete('/deleteCategory/:id', checkTokenAndRole("admin"), deleteCategory);

module.exports = router;