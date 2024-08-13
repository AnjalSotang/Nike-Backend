module.exports = (sequelize, Sequelize) => {
    const profile = sequelize.define('forgetPassword', {
        email: {
            
        }
    })

    return profile;
}