const router = require('express').Router();
const requireLogin = require('../middleware/auth').loginRequired
    ;
router.get('/', (req, res) => {
    res.render('home');
});

router.use('/dashboard', requireLogin,
    (req, res, next) => {
        res.locals.layout = 'dashboard';
        next();
    },
    require('./dashboard'));

router.use('/users', require('./resources/users'));
router.use('/gifts', require('./resources/gifts'));
router.use('/events', require('./resources/events'));

module.exports = router;