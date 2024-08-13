const { users, profile } = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ where: { email } });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await users.create({ username: username, email: email, password: hashedPassword });

            // Create the profile associated with the new user
            const newProfile = await profile.create({
                userId: newUser.id, // Link the profile to the new user
                username: username
            });

            return res.status(201).json({
                message: "Registration successful!",
                user: newUser,
                profile: newProfile
            });
        } else {
            return res.status(409).json({
                message: "Registration not successful! Try another email."
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred during registration.",
            error: error.message
        });
    }
};


const login = async (req, res) => {
    let { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ where: { email: email } });
        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);

            if (!match) {
                return res.status(409).json({
                    message: "Incorrect Password"
                });
            }
            //Creating JsonWebToken
            let token = jwt.sign({ id: existingUser.id, role: existingUser.role }, "secret-key");
            //Sending the response token and existingUser
            return res.status(200).json({
                token: token,
                user: existingUser
            });

        } else {
            return res.status(500).json({
                message: "Please Do Registration First"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Unexpected error occured while login up",
            error: error.message
        })
    }

}

const user_forgotPassword = async (req, res) => {
    let { email } = req.body;

    try {
        const existingEmail = await users.findOne({ where: { email: email } });

        if (!existingEmail) {
            return res.status(400).json({
                message: "Do registration first"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 1);

        const [updated] = await users.update(
            { otp: otp, otpExpire: otpExpire },
            { where: { email: email } }
        );

        if (updated === 0) {
            return res.status(500).json({
                message: "Something went wrong"
            });
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "anjalsotang26@gmail.com",
                pass: "nzbr fipe dbka xryp",
            },
        });

        const mailOptions = {
            from: "anjalsotang26@gmail.com",
            to: email,
            subject: "Please reset OTP",
            text: `Your OTP (It expires after 1 min) : ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    message: `Something went wrong: ${error}`
                });
            } else {
                return res.status(200).json({
                    message: "Your OTP has been sent to the email"
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const resetPassword = async (req, res) => {
    let { password, confirmPassword, otp } = req.body;

    if (!password || !confirmPassword || !otp) {
        return res.status(400).json({
            error: "Form data not found"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Passwords are not equal"
        });
    }

    try {
        // Check if OTP is valid and not expired
        const record = await users.findOne({
            where: {
                otp: otp,
                otpExpire: {
                    [Sequelize.Op.gt]: new Date() // Check if OTP has not expired
                }
            }
        });

        if (!record) {
            return res.status(400).json({
                error: 'Invalid or expired OTP'
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password and reset OTP fields
        await users.update(
            {
                password: hashedPassword,
                otp: null,
                otpExpire: null
            },
            {
                where: { otp: otp }
            }
        );

        return res.json({
            message: 'Password reset successful'
        });

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};




    module.exports = {
        register,
        login,
        user_forgotPassword,
        resetPassword
    }
