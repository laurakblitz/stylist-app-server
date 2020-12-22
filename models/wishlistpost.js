const { STRING } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const WishlistPost = sequelize.define('wishlistpost', {
        image: {
            type: DataTypes.BINARY-STRING,
            allowNull: false,
        },
        imageComment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return WishlistPost;
};