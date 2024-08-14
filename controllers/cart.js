const { cart, product } = require("../models/index")

const createCart = async (req, res) => {
    let { id } = req.params;
    let userId = req.decoded.id;
    let {quantity} = req.body;

    try {
        const existingProduct = await product.findOne({where: {id : id}})
        if(!existingProduct){
            res.status(500).json({
                message: "Product is out of stock"
            }) 
        }

        const create = await cart.create({
            quantity: quantity, ProductId: id, UserId: userId
        })

        if (!create) {
            res.status(500).json({
                message: "Unfortunatlty add to cart was not successfull"
            })
        } else {
            res.status(200).json({
                message: "Product added to the cart successfully!!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error was occerd.",
            error: error.message
        });
    }
}

const viewCart = async (req, res) => {
    let userId = req.decoded.id;

    try {
        const response = await cart.findAll({ include: [{ model: product }], where: { UserId: userId } })
        if (!response) {
            res.status(500).json({
                message: "Cart details can't be shown!"
            })
        } else {
            res.status(200).json({
                message: response
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "An error was occerd.",
            error: error.message    
        });
    }
}

const deleteCart = async (req, res) => {
    let cartId = req.params.id;

    try {
        const response = await cart.destroy({ where: { id: cartId } });
        if (response === 0) {
            res.status(404).json({
                message: "Cart not found or could not be deleted"
            });
        } else {
            res.status(200).json({
                message: "Cart deleted successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred.",
            error: error.message
        });
    }
};


module.exports = {
    createCart,
    viewCart,
    deleteCart
}