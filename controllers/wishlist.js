const db = require("../models");

const createWish = async (req, res) => {
    let { productId } = req.params;

    let userId = req.decoded.id

    const response = await db.wishList.create({ productId: productId, userId: userId });
    res.status(200).json({
        message: "Product Added to the wish list",
        data: response
    })
}

const findWishById = async (req, res) => {
    let userId = req.decoded.id;

    const project = await db.wishList.findAll({ where: { userId: userId } });
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

const findAllWish = async (req, res) => {
    const findAll = await db.wishList.findAll({
        include: [{ model: db.product }, { model: db.users }],
    });
    res.status(200).json({
        data: findAll
    })
}

const updateWish = async (req, res) => {
    let { id } = req.params;
    let { productId } = req.body;

    const wish = await db.wishList.findByPk(id);
    if (!wish) {
        console.log('Not found!');
        res.status(200).json({
            message: "Not Found"
        })
    } else {
        const update = await db.wishList.update(
            { productId: productId },
            {
                where: {
                    id: id,
                },
            },
        );
        res.status(500).json({
            update
        })
    }

}

const deleteWish = async (req, res) => {
    let { id } = req.params
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
    findAllWish,
    updateWish,
    deleteWish
}