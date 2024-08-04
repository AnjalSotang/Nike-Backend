module.exports = (sequelize, Sequelize) => {
    const profile = sequelize.define('Profile', {
        username: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        dateOfBirth: {
            type: Sequelize.STRING
        },
        imgae: {
            type: Sequelize.STRING
        }
    })

    return profile;
}