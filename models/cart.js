module.exports = (sequelize, Sequelize) => {
    const cart = sequelize.define('cart',{
        quantity: {
            type: Sequelize.STRING
        }
    })
    return cart;
}