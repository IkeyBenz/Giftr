const jwt = require('jsonwebtoken');
const User = require('../models/user');


function checkAuth(req, res, next) {
    if (req.cookies && req.cookies.giftr) {
        const uid = jwt.decode(req.cookies.giftr)._id;
        User.findById(uid).populate('events').then(user => {
            res.locals.authenticatedUser = user;
            req.user = user;
            return next();
        });
    } else {
        return next();
    }
}
function loginRequired(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.redirect('/users/signin');
    }
}

module.exports = {
    checkAuth: checkAuth,
    loginRequired: [checkAuth, loginRequired]
}