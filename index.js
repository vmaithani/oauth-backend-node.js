const express = require ('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoDBUri);

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("hi");

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

