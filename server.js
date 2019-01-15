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

// app.use('/api', require('./controllers/api'));

// Dashboard router NEEDS to be above main router (middlewares require it)
// app.use('/dashboard',
//     require('./middleware/redirector').requestLogin,
//     (req, res, next) => { res.locals.layout = 'dashboard'; next() },
//     require('./controllers/securedRoutes')
// );
// app.use('/',
//     require('./middleware/redirector').sendIndex,
//     require('./middleware/redirector').sendDashboard,
//     require('./controllers/pages')
// );

// Code for when I migrate to REACT template:

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.use('/', (req, res, next) => {
    res.locals.layout = 'main';
    next();
}, require('./controllers2/main'));

app.listen(PORT, console.log('Running Giftr on port ' + PORT));

module.exports = app;

