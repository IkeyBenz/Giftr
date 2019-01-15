const users = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const _getTokenFor = (user) => {
    return jwt.sign(
        { _id: user._id },
        process.env.SECRET,
        { expiresIn: '60 days' }
    );
}

/* Forwarding from '/users' */

// GET signup page
users.get('/new', (req, res) => {
    res.render('signup');
});

// GET signin page
users.get('/signin', (req, res) => {
    res.render('signin');
});

// CREATE new user
users.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(user => {
        res.cookie('giftr', _getTokenFor(user), { maxAge: 1000 * 60 * 60 * 24 * 60 });
        const n = req.body.name,
            firstName = n.indexOf(' ') > -1 ? n.slice(0, n.indexOf(' ')) : n,
            message = `Welcome ${firstName}! We've successfully created your account.`;
        res.redirect(`/dashboard/?success=${message}`);
    }).catch(error => {
        res.redirect(`/users/signin/?error=${error.message}`);
    });
});

// POST sign user in with email and password
users.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email }, 'email name password').then(user => {
        if (user) {
            user.comparePassword(req.body.password, (error, matched) => {
                if (matched) {
                    res.cookie('giftr', _getTokenFor(user), { maxAge: 60 * 60 * 24 * 60 });
                    // res.status(200).json(`Logged in as ${user.name}`);
                    res.redirect(`/dashboard/?success=Signed in as ${user.name}`)
                } else {
                    res.redirect('/users/signin/?error=Incorrect Password.');
                }
            })
        } else {
            res.redirect('/users/signin/?error=User does not exist.');
        }
    }).catch(error => {
        res.redirect(`/users/signin/?error=${error.message}`);
    });
});

// GET signout
users.get('/signout', (req, res) => {
    res.clearCookie('giftr');
    res.redirect('/');
});

module.exports = users;