const Event = require('../models/event');

module.exports = function (app) {

    app.get('/events/new', sendToSignInPage, (req, res) => {
        res.render('events/new');
    });

    app.get('/events', (req, res) => {
        Event.find({}).then(events => {
            res.render('events/show', { events: events });
        });
    });

    app.get('/events/:id', (req, res) => {
        Event.findById(req.params.id).then(event => {
            res.render('events/show', { events: event });
        });
    });

    app.post('/events', sendToSignInPage, (req, res) => {

        const newEvent = new Event(req.body);
        newEvent.save().then(event => {
            res.render('profile/events');
        });
    });

    app.patch('/events/:id', sendToSignInPage, (req, res) => {
        Event.findByIdAndUpdate(req.params.id, req.body).then(event => {
            res.redirect('/profile/events')
        })
    });

    app.delete('/events/:id', sendToSignInPage, (req, res) => {

    })

}

function sendToSignInPage(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.render('signin');
    }
}