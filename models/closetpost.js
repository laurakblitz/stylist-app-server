// const { STRING } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const ClosetPost = sequelize.define('closetpost', {
        imageCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return ClosetPost;
};