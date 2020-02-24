const express = require('express');
const app = express();
const port = 4000;
const passport = require('passport');
const authComponent = require('./components/auth');
const jwtAuth= require('./components/jwt_auth');
const usersComponent = require('./components/users');
const dogsComponent = require('./components/dogs');
const imageUpload = require('./components/imageUpload');
const bodyParser = require('body-parser');
const apiKeyDemo = require('./components/apiKeyDemo');
const cors = require('cors');
const GooglePassportSetup = require('./service/googlePassport');
const FacebookPassportSetup = require('./service/facebookPassport');
const GithubPassportSetup = require('./service/githubPassport');
const TwitterPassportSetup = require('./service/twitterPassport');
const InstagramPassportSetup = require('./service/instagramPassport');
const db = require('./db');
const cookieSession = require('cookie-session');
const keys = require('./service/Key');
const products = require('./components/products');


const customHeaderCheckerMiddleware = function (req, res, next) {
    console.log('Middleware is active!');
    if (req.headers['custom-header-param'] === undefined) {
        return res.status(400).json({ reason: "custom-header-param header missing" });
    }

    // pass the control to the next handler in line
    next();
}

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// app.use(customHeaderCheckerMiddleware);
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET",
    credentials:true
}));
app.use(passport.initialize());
app.use(passport.session());
/* basic HTTP method handling */
app.get('/hello', (req, res) => res.send('Hello GET World!'));
app.post('/hello', (req, res) => res.send('Hello POST World!'));
app.put('/hello', (req, res) => res.send('Hello PUT World!'));
app.delete('/hello', (req, res) => res.send('Hello DELETE World!'));
app.use('/jwt', jwtAuth);
/* Route parameters */
app.get('/hello/:parameter1/world/:parameter2', (req, res) => {
    res.send('Your route parameters are\n' + JSON.stringify(req.params));
});

/* Example of defining routes with different method handlers */
app.route('/world')
    .get((req, res) => res.send('get World'))
    .post((req, res) => res.send('post World'))
    .put((req, res) => res.send('put World'))
    .delete((req, res) => res.send('delete World'))

/* demonstrate route module/component usage - the dogComponent content is defined in separate file */
app.use('/auth', authComponent);
app.use('/users', usersComponent);
app.use('/apiKey', apiKeyDemo);
app.use('/dogs', dogsComponent);
app.use('/fileUpload', imageUpload);
app.use('/products', products);

/* This will be activated as the last if no other route matches. */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404; // Set status code to 404
    next(err);  /* If you pass anything to the next() function (except the string 'route'),
                 Express regards the current request as being an error and will skip any
                 remaining non-error handling routing and middleware functions. */
});

/* This is an error handling middleware, the function has four parameters.
   See https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling */
app.use((err, req, res, next) => {
    res.status(err.status);
    console.error(err.toString());
    console.error('Path attempted - ' + req.path)
    res.send(err.toString());
});
//Database init
Promise.all(
    [
        db.query(`CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            idOauth VARCHAR(32),
            username VARCHAR(32),
            password VARCHAR(256),
            name VARCHAR(32)
        )`),
        db.query(`CREATE TABLE IF NOT EXISTS products(
            idproduct INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            idusers INT(11) NOT NULL,
            Title varchar(45) NOT NULL,
            Description varchar(45) NOT NULL,
            Category varchar(45) NOT NULL,
            Location varchar(45) NOT NULL,
            Images varchar(256) Default NUll,
            Price varchar(45) NOT NULL,
            ShippingType varchar(45) NOT NULL,
            Date datetime default CURRENT_TIMESTAMP,
            INDEX iduser_idx (idusers ASC),
            CONSTRAINT iduser FOREIGN KEY (idusers) REFERENCES mobile.users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
        )`)
        // Add more table create statements if you need more tables
    ]
).then(() => {
    console.log('database initialized');
})

app.listen(port, () => {
    console.log(`Example API listening on http://localhost:${port}\n`);
    console.log('Available API endpoints');
    console.log('  /hello [GET, POST, PUT, DELETE]');
    console.log('  /hello/{param1}/world/{param2} [GET]');
    console.log('  /world [GET, POST, PUT, DELETE]');
    console.log('\n  /dogs [GET, POST]');
    console.log('  /dogs/{dogId} [GET, DELETE]');
    console.log('\n  /apikey/new/{username} [GET]');
    console.log('  /apikey/protected} [GET]');
    console.log('\n  /fileUpload [POST] multipart file upload');
    console.log('\n\n Use for example curl or Postman tools to send HTTP requests to the endpoints');
});