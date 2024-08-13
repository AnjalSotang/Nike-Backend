const db = require("../models");

const createWish = async (req, res) => {
    let { id } = req.params;

    let userId = req.decoded.id

    const response = await db.wishList.create({ ProductId: id, userId: userId });
    res.status(200).json({
        message: "Product Added to the wish list",
        data: response
    })
}

const findWishById = async (req, res) => {
    let userId = req.decoded.id;

    const project = await db.wishList.findAll({ include: [{ model: db.product }], where: { userId: userId } });
    if (!project) {
        res.status(500).json({
            message: "Nothing in the wishlist"
        })
    } else {
        res.status(200).json({
            data: project
        })
    }
}


const deleteWish = async (req, res) => {
    let { id } = req.params;
    let response = await db.wishList.destroy({
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
    createWish,
    findWishById,
    deleteWish
}