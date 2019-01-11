const dashboard = require('express').Router();


dashboard.get('/', (req, res) => {
    res.render('Dashboard/index');
});

module.exports = dashboard;