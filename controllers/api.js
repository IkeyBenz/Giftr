const api = require('express').Router();

// Authentication requests
api.get('/auth', require('./auth'));



module.exports = api;