const { where } = require("sequelize");
const {product} = require("../models");

const createProduct = async (req, res) => {
  let { name, price, description,features, stock, categoryId} = req.body;
  let image = req.files;


  let imagePaths = image.map((a)=> a.path)

  const existingProduct = await product.findOne({where: {name: name}})
  if(!existingProduct){
    const response = await product.create({ name: name, price: price, description: description,features: features, stock: stock, image: imagePaths, categoryId: categoryId });
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

const productById = async (req, res) => {
  let {id} = req.params;

  const response = await product.findByPk(id)
  if (response) {
    res.status(200).json({
      data: response
    })
  } else {
    res.status(500).json({
      message: "Product not found"
    })
  }
}

const findAllProduct = async (req, res) => {
    const response = await product.findAll()
    res.status(200).json({
      data: response
    })
  }

const updateProduct = async (req, res) => {
  let { id } = req.params;
  let { name, price, description,features, stock, categoryId} = req.body;
  let image = req.files;

  let imagePaths = image.map((a)=> a.path)

  const productFound = await product.findOne({where:{id: id} });

  if (productFound) {
    let response = await product.update(
      { name: name, price: price, description: description,features: features, stock: stock, image: imagePaths, categoryId: categoryId  },
      {
        where: {
          id: id,
        },
      },
    );
    if (response) {
      res.status(200).json({
        message: "Product updated successfully"
      })
    } else {
      res.status(500).json({
        message: "Update was not successful"
      })
    }
  } else {
    res.status(500).json({
      message: "Product Not found"
    })
  }
}

const deleteProduct = async (req, res) => {
  let { id } = req.params
  let response = await product.destroy({
    where: {
      id: id,
    },
  });
  if (response) {
    res.status(200).json({
      message: "Product deleted successfully"
    })
  } else {
    res.status(500).json({
      message: "Product not found"
    })
  }
}

module.exports = {
  createProduct,
  productById,
  findAllProduct,
  updateProduct,
  deleteProduct
}
