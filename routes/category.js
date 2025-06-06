const express = require("express")
const { createCategory, categoryById, findAllCategory, updateCategory, deleteCategory} = require("../controllers/category")
const { checkTokenAndRole } = require("../middleware/checkTokenAndRole");
const router = express.Router()

router.post('/createCategory', checkTokenAndRole("admin"), createCategory);
router.get('/categoryById/:id', categoryById);
router.get('/findAllCategory', findAllCategory);
router.patch('/updateCategory/:id', checkTokenAndRole("admin"), updateCategory);
router.delete('/deleteCategory/:id', checkTokenAndRole("admin"), deleteCategory);

module.exports = router;