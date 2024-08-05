const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME , process.env.DB_PASSWORD, {
    'host': process.env.DB_HOST,
    'dialect': 'mysql'
})

const checkingConnectivity = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unfortunately! The connection was not successful:", error);
    }
}

checkingConnectivity();

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./auth")(sequelize, Sequelize);
db.profile = require("./profile")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);

db.users.hasOne(db.profile);
db.profile.belongsTo(db.users)

module.exports = db;