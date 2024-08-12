module.exports = (sequelize, Sequelize) =>{
    const order = sequelize.define('order', {
        shippingAddress: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }    
    })
    return order;
}