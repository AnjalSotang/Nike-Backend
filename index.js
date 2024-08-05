const express = require("express");
const { users, sequelize } = require("./models/index");
const bcrypt = require("bcrypt")
const app = express()
const path = require("path")
const cors = require('cors')


sequelize.sync({ force: false});


app.use(cors({
    origin: "*"
}))


// Built-in middleware functions for parsing request bodies
// Using these middlewares ensures that your Express application can handle and parse both JSON and URL-encoded data from incoming requests.
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads


app.use("/uploads", express.static(path.join(__dirname, "uploads")))


//auth
const routeAuth = require("./routes/auth");
app.use("/auth", routeAuth)

// //auth
const routeProfile = require("./routes/profile");
app.use("/api", routeProfile)

const routeCategory = require("./routes/category");
app.use("/api", routeCategory)

const createUser = async () => {
    let foundAdmin = await users.findOne({
        where: {
            role: "admin"
        }
    })
    

    if (!foundAdmin) {
        const hashpassword = await bcrypt.hash("password", 8);
        await users.create({
            email: "admin@gmail.com",
            password: hashpassword,
            role: "admin"
        })
        console.log("created successfully")
    } else {
        console.log("already seeeded")
    }
}
createUser()

app.listen(3001, () => console.log("Server started running!!"))