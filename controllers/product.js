const { where, Op } = require("sequelize");
const { product } = require("../models");
const { getPagination, getPagingData } = require('../helpers/util');


const createProduct = async (req, res) => {
  let { name, price, description, features, stock, categoryId } = req.body;
  let image = req.files;


  let imagePaths = image.map((a) => a.path)
  console.log(imagePaths)

  const existingProduct = await product.findOne({ where: { name: name } })
  if (!existingProduct) {
    const response = await product.create({ name: name, price: price, description: description, features: features, stock: stock, image: imagePaths, categoryId: categoryId });
    if (response) {
      res.status(200).json({
        message: "Product Created Successfully"
      })
    } else {
      res.status(500).json({
        message: "Somethin went wrong"
      })
    }
  } else {
    res.status(500).json({
      message: "Product Already Exist"
    })
  }
}

const productById = async (req, res) => {
  let { id } = req.params;

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
// const findAllProduct = async (req, res) => {
//   try {
//     // Get page, size, and name from query parameters (with default values)
//     const { page = 1, size = 2, name } = req.query;

//     // Convert page and size to integers
//     const limit = parseInt(size, 10);
//     const offset = (parseInt(page, 10) - 1) * limit;
   
//     // Build the search condition for the name
//     const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//     // Find all products with pagination and optional name filter
//     const response = await product.findAndCountAll({
//       where: condition,
//       offset: offset,
//       limit: limit,
//     });

//     // Calculate total pages
//     const totalPages = Math.ceil(response.count / limit);


//     // Send response with paginated data
//     res.status(200).json({
//       totalItems: response.count,
//       totalPages: totalPages,
//       currentPage: parseInt(page, 10),
//       data: response.rows,
//     });

//   } catch (error) {
//     // Handle any errors
//     res.status(500).json({ message: error.message });
//   }
// };


const findAllProduct = async (req, res) => {
  try {
    // Get page, size, and name from query parameters (with default values)
    const { page, size , name } = req.query;

    // Get pagination details (limit and offset)
    const { limit, offset } = getPagination(page, size);

    // Build the search condition for the name
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    // Find all products with pagination and optional name filter
    const response = await product.findAndCountAll({
      where: condition,
      offset: offset,
      limit: limit,
    });

    // Get paginated data and structure the response
    const pagingData = getPagingData(response, page, limit);

    // Send response with paginated data
    res.status(200).json(pagingData);

  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllProduct
};



const updateProduct = async (req, res) => {
  let { id } = req.params;
  let { name, price, description, features, stock, categoryId } = req.body;
  let image = req.files;

  let imagePaths = image.map((a) => a.path)

  const productFound = await product.findOne({ where: { id: id } });

  if (productFound) {
    let response = await product.update(
      { name: name, price: price, description: description, features: features, stock: stock, image: imagePaths, categoryId: categoryId },
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
