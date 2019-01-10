const pageRouter = require('express').Router();

pageRouter.get('/signin', (req, res) => {
    res.render('signin');
});

pageRouter.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = pageRouter;



