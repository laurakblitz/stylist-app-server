const { STRING } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const WishlistPosts = sequelize.define('wishlistposts', {
        image: {
            type: DataTypes.BINARY-STRING,
            allowNull: false,
        },
        imageComment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return WishlistPosts;
};