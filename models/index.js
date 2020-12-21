const User = require('./user');
const ClosetPosts = require('./closetposts');
const WishlistPosts = require('./wishlistposts');

User.hasMany(ClosetPosts)
ClosetPosts.belongsTo(User)

User.hasMany(WishlistPosts)
WishlistPosts.belongsTo(User)

module.exports = {User, ClosetPosts, WishlistPosts}