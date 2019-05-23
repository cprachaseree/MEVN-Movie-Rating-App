const express = require('express');
// parse the incoming requests
const bodyParser = require('body-parser');
// object modelling for mongoose
const mongoose = require('mongoose');
// handle cross-origin requests between frontend and backend
const cors = require('cors');
// HTTP request logger
const morgan = require('morgan');
const fs = require('fs');
// tokenizes requests
const jwt = require('jsonwebtoken');
// authenticator
const passport = require('passport');
// configure passport-jwt
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// connect to mongodb local database
mongoose.connect('mongodb://localhost/movie_rating_app', function() {
  console.log('Connection to mongodb has been made');
})
.catch(err => {
  console.error('App starting error:', err.stack);
  process.exit(1);
});

// include controllers
fs.readdirSync("controllers").forEach(function (file) {
  if(file.substr(-3) == ".js") {
    const route = require("./controllers/" + file);
    route.controller(app);
  }
});

router.get('/', function(req, res) {
  res.json({ message: 'API initialized!' });
});

// express server to run on 8081 port
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
