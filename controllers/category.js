const { where } = require("sequelize");
const db = require("../models");

const createCategory = async (req, res) => {
  let { name } = req.body;

  const response = await db.category.create({ name: name });
  if (response) {
    res.status(200).json({
      message: "Category Created Successfully"
    })
  } else {
    res.status(500).json({
      message: "Somethin went wrong"
    })
  }
}

const categoryById = async (req, res) => {
  let {id} = req.params;

  const response = await db.category.findByPk(id)
  if (response) {
    res.status(200).json({
      data: response
    })
  } else {
    res.status(500).json({
      message: "Somethin went wrong"
    })
  }
}

const findAllCategory = async (req, res) => {
    const response = await db.category.findAll()
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
  createCategory,
  categoryById,
  findAllCategory,
  updateCategory,
  deleteCategory
}
