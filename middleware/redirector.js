module.exports = {

    sendDashboard: (req, res, next) => {
        if (req.user) {
            return res.redirect('/dashboard');
        }
        next();
    },

    requestLogin: (req, res, next) => {
        if (!req.user)
            return res.redirect('/signin');
        next();
    },

    sendIndex: (req, res, next) => {
        res.locals.layout = 'main';
        if (req.path == '/')
            return res.render('home');
        next()
    }

}