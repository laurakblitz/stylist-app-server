const { DataTypes } = require('sequelize');
const db = require('../db');

const Closet = db.define('closet', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Closet;

// role: {
//     type: DataTypes.ENUM('user', 'admin'),
//     defaultValue: 'user'
// },