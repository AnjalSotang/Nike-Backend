module.exports = (sequelize, Sequelize) =>{
    const payment = sequelize.define('payment', {
        amount: {
            type: Sequelize.INTEGER
        },
        paymentType: {
            type: Sequelize.STRING
        }    
    })
    return payment;
}