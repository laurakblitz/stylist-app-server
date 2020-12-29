const sequelize = require("sequelize");

const User = require('./user');
const Closet = require('./closet');
const Wishlist = require('./wishlist');

User.hasMany(Closet, {
    as: 'closets',
    foreignKey: 'owner_id'
});

User.hasMany(Wishlist, {
    as: 'wishlists',
    foreignKey: 'owner_id'
});

Wishlist.belongsTo(User);
Closet.belongsTo(User);

module.exports = {User, Closet, Wishlist};