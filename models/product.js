module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define('Products', {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        features: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.JSON,
        }
    })

    return products;
}