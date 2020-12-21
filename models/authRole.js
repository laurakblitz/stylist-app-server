const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const authRoles = function () {
    ac.grant('user')
        .readOwn('user')
        .updateOwn('user')
        .createOwn('closetposts')
        .createOwn('wishlistposts')
        .updateOwn('closetposts')
        .updateOwn('wishlistposts')
        .deleteOwn('closetposts')
        .deleteOwn('wishlistposts')

        ac.grant('admin')
        .extend('user')
        .updateAny('user')
};

module.exports = authRoles;