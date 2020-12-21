const { STRING } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const ClosetPosts = sequelize.define('closetposts', {
        image: {
            type: DataTypes.BINARY-STRING,
            allowNull: false,
        },
        imageCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return ClosetPosts;
};