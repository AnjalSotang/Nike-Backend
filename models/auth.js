module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
            allowNull: true,  // Ensures that username cannot be null
            validate: {
                len: [1, 50]  // Adjust length constraints as needed
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,  // Ensures that email cannot be null
            unique: true,      // Enforces uniqueness of email
            validate: {
                isEmail: true   // Validates email format
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,  // Ensures that password cannot be null
            validate: {
                len: [8, 100]  // Adjust length constraints as needed
            }
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: true,  // Allow null for cases where OTP is not set
        },
        otpExpire: {
            type: Sequelize.DATE,
            allowNull: true,  // Allow null for cases where OTP is not set
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    });

    return User;
}

