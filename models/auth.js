module.exports = (sequelize, Sequelize) => {
    const auth = sequelize.define('user', {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    })
    return auth;
}
