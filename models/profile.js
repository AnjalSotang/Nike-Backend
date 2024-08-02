module.exports = (sequelize, Sequelize) => {
    const profile = sequelize.define('Profile', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.TEXT
        },
        dateOfBirth: {
            type: Sequelize.DATE
        },
        imgae: {
            type: Sequelize.STRING
        }
    })

    return profile;
}