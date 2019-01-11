const Event = require('../models/event');
const events = require('express').Router();

events.get('/events/new', sendToSignInPage, (req, res) => {
    res.render('Dashboard/Events/new');
});

events.get('/events', (req, res) => {
    Event.find({}).then(events => {
        res.render('events/show', { events: events });
    });
});

events.get('/events/:id', (req, res) => {
    Event.findById(req.params.id).then(event => {
        res.render('events/show', { events: event });
    });
});

events.post('/events', sendToSignInPage, (req, res) => {
    const newEvent = new Event(req.body);
    newEvent.save().then(event => {
        res.render('profile/events');
    });
});

events.patch('/events/:id', sendToSignInPage, (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body).then(event => {
        res.redirect('/profile/events')
    })
});

events.delete('/events/:id', sendToSignInPage, (req, res) => {

});



function sendToSignInPage(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.render('signin');
    }
}