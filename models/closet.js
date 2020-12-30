const { DataTypes } = require('sequelize');
const db = require('../db');

const Closet = db.define('closet', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Closet;

    // owner_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }

// const Closet = db.define('closet', {
//     category: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     owner_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// });

// role: {
//     type: DataTypes.ENUM('user', 'admin'),
//     defaultValue: 'user'
// },