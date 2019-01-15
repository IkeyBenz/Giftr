const dashboard = require('express').Router();

/* Forwarding from '/dashboard' */

dashboard.get('/', (req, res) => {
    res.render('Dashboard/index');
});

dashboard.get('/events', (req, res) => {
    res.render('Events/show');
});

module.exports = dashboard;