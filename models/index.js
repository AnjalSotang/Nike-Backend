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
db.product = require('./product')(sequelize, Sequelize)
db.wishList = require('./wishlist')(sequelize, Sequelize);
db.cart = require('./cart')(sequelize, Sequelize);
db.order = require('./order')(sequelize, Sequelize);
db.payment = require('./payment')(sequelize, Sequelize);

db.users.hasOne(db.profile);
db.profile.belongsTo(db.users)

db.category.hasMany(db.product);
db.product.belongsTo(db.category);

db.users.hasMany(db.wishList);
db.wishList.belongsTo(db.users);
db.product.hasMany(db.wishList);
db.wishList.belongsTo(db.product);

db.users.hasMany(db.cart);
db.cart.belongsTo(db.users);
db.product.hasMany(db.cart);
db.cart.belongsTo(db.product);
db.users.hasMany(db.order);
db.order.belongsTo(db.users);
db.cart.hasMany(db.order);
db.order.belongsTo(db.cart)

db.users.hasMany(db.payment)
db.payment.belongsTo(db.users)
db.order.hasOne(db.payment);
db.payment.belongsTo(db.order)

module.exports = db;