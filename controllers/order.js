const { where } = require("sequelize");
const db = require("../model");

const createOrder = async (req, res) => {
    let {shippingAddress, status, productId } = req.body;
    let userId = req.decoded.id

    try{
        const response = await db.order.create({ shippingAddress: shippingAddress, status: status, productId: productId, userId: userId });
        if(!response){
            res.status(500).json({
                message: "Sorry order was not placed!"
            })
        }else{
            res.status(200).json({
                data: response
            })
        }
    }catch(error){
        return res.status(500).json({
            message: "An error was occerd.",
            error: error.message    
        });
    }
}

const findUserById = async (req, res) => {
    let userId = req.decoded.id;
    console.log(userId)
    const project = await db.order.findAll({ where: { userId: userId } });
    if(!project) {
        console.log('Not found!');
    } else {
        res.send({
            project
        })
    }
}

const findAllOrder = async (req, res) => {
    const orders = await db.order.findAll();
    res.send({
        orders
    })
}

const updateStatus = async (req, res) => {
    let { id } = req.params;
    let { status } = req.body;

    const orderFound = await db.order.findByPk(id);
    if (orderFound === null) {
        console.log('Not found!');
        res.send({
            message: "Not Found"
        })
    } else {
        const update = await db.order.update(
            { status: status },
            {
                where: {
                    id: id,
                },
            },
        );
        res.send({
            update
        })
    }

}



module.exports = {
    createOrder,
    findUserById,
    findAllOrder,
    updateStatus
}