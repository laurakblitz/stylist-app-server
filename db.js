const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres'
});

module.exports = db;

// const User = db.import('./models/user');
// const ClosetPosts = db.import('./models/closetposts');
// const WishlistPosts = db.import('./models/wishlistposts');
// const User = sequelize.define('./models/user');
// const ClosetPosts = sequelize.define('./models/closetposts');
// const WishlistPosts = sequelize.define('./models/wishlistposts');