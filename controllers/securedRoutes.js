const dashboard = require('express').Router();

dashboard.get('/', (req, res) => {
    res.render('Dashboard/index');
});

// Forward all event related requests to the events controller
// 'events' path is nested with '/dashboard' because they require login

dashboard.use('/events', require('./events'));
dashboard.use('/gifts', require('./gifts'));

module.exports = dashboard;