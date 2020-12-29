const { DataTypes } = require('sequelize');
const db = require('../db');

const Wishlist = db.define('wishlist', {
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Wishlist;

// const { STRING } = require("sequelize/types");

// module.exports = (sequelize, DataTypes) => {
//     const Wishlist = sequelize.define('wishlist', {
//         image: {
//             type: DataTypes.BINARY-STRING,
//             allowNull: false,
//         },
//         imageComment: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });
//     return Wishlist;
// };
