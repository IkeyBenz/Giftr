const gifts = require('express').Router();
const Gift = require('../models/gift');

// Forwarding from /dashboard/gifts

gifts.get('/', (req, res) => {
    Gift.find({}).then(gifts => {
        res.render('Gifts/show', { gifts });
    });
});

gifts.get('/:id', (req, res) => {
    Gift.findById(req.params.id).then(gift => {
        res.render('Gifts/show', { gift })
    });
});

gifts.get('/new', (req, res) => {
    res.render('Gifts/new');
});

gifts.post('/', (req, res) => {
    const newGift = new Gift(req.body);
    newGift.save().then(() => {
        req.user.gifts.unshift(newGift);
        req.user.save();
        res.redirect('/dashboard/gifts');
    });
});

module.exports = gifts;

// Updating and deleting gifts doesnt make sense so there are no methods for it