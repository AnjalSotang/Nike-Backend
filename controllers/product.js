const { where } = require("sequelize");
const {product} = require("../models");

const createProduct = async (req, res) => {
  let { name, price, description,features, stock} = req.body;
  let image = req.files;


  let imagePaths = image.map((a)=> a.path)

  const existingProduct = await product.findOne({where: {name: name}})
  if(!existingProduct){
    const response = await product.create({ name: name, price: price, description: description,features: features, stock: stock, image: imagePaths });
    if (response) {
      res.status(200).json({
        message: "Product Created Successfully"
      })
    } else {
      res.status(500).json({
        message: "Somethin went wrong"
      })
    }
  }else{
    res.status(500).json({
        message: "Product Already Exist"
      })
  }
}

const findAllProduct = async (req, res) => {
    const response = await product.findAll()
    res.status(200).json({
      data: response
    })
  }

const updateCategory = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  const categoryFound = await db.category.findOne({where:{id: id} });

  if (categoryFound) {
    let response = await db.category.update(
      { name: name },
      {
        where: {
          id: id,
        },
      },
    );
    if (response) {
      res.status(200).json({
        message: "Updated successfully"
      })
    } else {
      res.status(500).json({
        message: "not found"
      })
    }
  } else {
    res.status(500).json({
      message: "Category id not available add it first"
    })
  }
}

const deleteCategory = async (req, res) => {
  let { id } = req.params
  let response = await db.category.destroy({
    where: {
      id: id,
    },
  });
  if (response) {
    res.status(200).json({
      message: "deleted successfully"
    })
  } else {
    res.status(500).json({
      message: "not found"
    })
  }
}

module.exports = {
  createProduct,
  findAllProduct,
  updateCategory,
  deleteCategory
}
