const user = require('../models/User.js');

const passwordJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

module.exports.controller = (app) => {
  // register a user
  app.post('/users/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
      name,
      email,
      password,
    });
    User.createUser(newUser, (error, user) => {
      if(error) {
        res.status(422)json({
          message: 'Something went wrong. Please try again in a moment!',
        });
      }
      res.send({ user });
    });
  });

  // login a user
  app.post()
};
