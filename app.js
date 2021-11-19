const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const apiRouter = require('./routes/api.route');
const docRouter = require('./routes/doc.route');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();
const port = process.env.APP_PORT ?? 3000;

app.use(session({secret: 'restapi', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/api-docs', docRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).json({error: {code: 404, message: 'Invalid API access route'}});
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

exports.passport = passport;