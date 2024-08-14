module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        otp: {
            type: Sequelize.STRING,
        },
        otpExpire: {
            type: Sequelize.DATE,
        
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    });

    return User;
}

