const mongoose = require('mongoose');
const assert = require('assert');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/giftr',
    { useNewUrlParser: true },
    function (error, db) {
        assert.equal(error, null);
        console.log('Successfully connected to database.');
    }
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = mongoose.connection;