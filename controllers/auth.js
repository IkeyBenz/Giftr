const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('express').Router();

// Forwarding from /api/auth/..

auth.get('/signout', (req, res) => {
    res.clearCookie('giftr');
    res.redirect('/');
});

auth.post('/signup', (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(user => {
        res.cookie('giftr', _getTokenFor(user), { maxAge: 60 * 60 * 24 * 60 });
        const n = req.body.name,
            firstName = n.indexOf(' ') > -1 ? n.slice(0, n.indexOf(' ')) : n,
            message = `Welcome ${firstName}! We've successfully created your account.`;
        // res.status(200).json(message);
        res.redirect(`/dashboard/?success=${message}`);
    }).catch(error => {
        res.redirect(`/signin/?error=${error.message}`);
    });
});

auth.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email }, 'email name password').then(user => {
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (matched) {
                    res.cookie('giftr', _getTokenFor(user), { maxAge: 60 * 60 * 24 * 60 });
                    // res.status(200).json(`Logged in as ${user.name}`);
                    res.redirect(`/dashboard/?success=Signed in as ${user.name}`)
                } else {
                    res.redirect('/signin/?error=Incorrect Password.');
                }
            })
        } else {
            res.redirect('/signin/?error=User does not exist.');
        }
    }).catch(error => {
        res.redirect(`/signin/?error=${error.message}`);
    });
});

auth.get('/currentUser', (req, res) => {
    res.json(req.user);
});

function _getTokenFor(user) {
    return jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        { expiresIn: '60 days' }
    );
}

module.exports = auth;

