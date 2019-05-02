const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;
const app = express();

require('./data/database');
require('dotenv').config();

app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('method-override')('_method'));
app.use(require('./middleware/auth').checkAuth);


app.use('/', (req, res, next) => {
    res.locals.layout = 'main';
    next();
}, require('./controllers/main'));

app.listen(PORT, console.log('Running Giftr on port ' + PORT));

module.exports = app;

