const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
});

module.exports = User;


// admin: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
// }


// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('user', {
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         admin: {
//             type: DataTypes.BOOLEAN,
//             allowNull: true,
//         }
//     });
//     return User;
// };