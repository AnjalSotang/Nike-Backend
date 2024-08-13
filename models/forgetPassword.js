module.exports = (sequelize, Sequelize) => {
    const profile = sequelize.define('forgetPassword', {
        email: {
            type: Sequelize.STRING
        },
        otp: {
            type: Sequelize.STRING
        }
    })
    
    return profile;
}