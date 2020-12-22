const User = require('./user');
const ClosetPost = require('./closetpost');
const WishlistPost = require('./wishlistpost');

User.hasMany(ClosetPost)
ClosetPosts.belongsTo(User)

User.hasMany(WishlistPost)
WishlistPosts.belongsTo(User)

module.exports = {User, ClosetPost, WishlistPost}