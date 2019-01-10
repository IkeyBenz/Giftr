const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('express').Router();

// Forwarding from /api/auth/..

auth.get('/signup', (req, res) => {
    res.render('signup');
});

auth.get('/signin', (req, res) => {
    res.render('signin');
});

auth.get('/signout', (req, res) => {
    res.clearCookie('giftr');
    res.redirect('/');
});

auth.post('/signup', (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.save().then(user => {
        res.cookie('giftr', _getTokenFor(user), { maxAge: 60 * 60 * 24 * 60 });
        res.redirect('/');
    }).catch(error => {
        res.redirect(`/?error=${error.message}`);
    });
});

auth.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email }, 'email password').then(user => {
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (matched) {
                    res.cookie('giftr', _getTokenFor(user), { maxAge: 60 * 60 * 24 * 60 });
                    res.redirect('/');
                } else {
                    res.redirect('/?error=Incorrect Password.');
                }
            })
        } else {
            res.redirect('/?error=User does not exist.');
        }
    }).catch(error => {
        res.redirect(`/?error=${error.message}`);
    });
});

function _getTokenFor(user) {
    return jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        { expiresIn: '60 days' }
    );
}

module.exports = auth;

