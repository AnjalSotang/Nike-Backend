const {users, profile, forget} = require("../models")
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
    let {email, password} = req.body;

    try{
        const existingUser = await users.findOne({ where: { email: email } });
        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);
    
            if(!match){
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
            return res.status(409).json({
                message: "Please Do Registration First"
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: "Unexpected error occured while login up",
            error: error.message
        })
    }

}

const user_forgotPassword = async (req, res, next) => {
    let {email} = req.body;
    const existingEmail = await users.findOne({where: {email: email}})

    const otp = Math.floor(1000 + Math.random() * 9000);

    if(!existingEmail){
        res.status(500).json({
            message: "Email doesn't exists"
        })
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
        to: "anjalsotang26@gmail.com",
        subject: "Hello from Nodemailer",
        text: "This is a test email sent using Nodemailer.",
        OTP: `Your OTP (It is expired after 1 min) : ${otp}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Error: ${error}`);
        }
        else {
            res.json({
                data: "Your OTP send to the email"
            })
    };
})
}


     

module.exports= {
    register,
    login,
    user_forgotPassword
}
