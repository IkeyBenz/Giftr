const pages = require('express').Router();

pages.get('/signin', (req, res) => {
    res.render('signin');
});

pages.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = pages;



