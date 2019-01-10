const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

require('./data/database');
require('dotenv').config();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')());

app.use('/pages', (req, res, next) => {
    const url = req.originalUrl,
        route = url.split('/')[2];
    res.locals[route] = true;
    next();
}, require('./controllers/pages'));

app.use('/api', require('./controllers/api'));

app.get('/', (req, res) => {
    res.render('home');
});

// Code for when I migrate to REACT template:

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.listen(5000, console.log('Running Giftr on port 5000'));


