const Event = require('../models/event');
const events = require('express').Router();

// Forwarding from /dashboard/events

// GET new even form
events.get('/new', (req, res) => {
    res.locals.layout = 'main';
    res.render('Events/new');
});

// INDEX all events by specific user
events.get('/', (req, res) => {
    Event.find({ host: req.user._id }).then(events => {
        res.render('Events/show', { events });
    });
});

// CREATE new event
events.post('/', (req, res) => {
    const newEvent = new Event(req.body);

    newEvent.save().then(event => {

        req.user.events.unshift(newEvent);
        return req.user.save().then(user => {
            res.redirect('/dashboard/events');
        });

    }).catch(error => {
        res.redirect(req.originalUrl + '?error=' + error);
    });
});

// READ specific event
events.get('/:id', (req, res) => {
    Event.findById(req.params.id).then(event => {
        res.render('Events/show', { events: event });
    });
});

// UPDATE specific event
events.patch('/:id', (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body).then(event => {
        res.redirect('/dashboard/events');
    });
});

// DELETE specific event
events.delete('/:id', (req, res) => {

});

module.exports = events;