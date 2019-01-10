const api = require('express').Router();

// Forwarding from /api

api.use('/profile', require('./profile'));
api.use('/auth', require('./auth'));


module.exports = api;