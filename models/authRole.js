const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const authRoles = function () {
    ac.grant('user')
        .readOwn('user')
        .updateOwn('user')
        .createOwn('closet')
        .createOwn('wishlist')
        .updateOwn('closet')
        .updateOwn('wishlist')
        .deleteOwn('closet')
        .deleteOwn('wishlist')

    ac.grant('admin')
        .extend('user')
        .deleteAny('user')
};

module.exports = authRoles;