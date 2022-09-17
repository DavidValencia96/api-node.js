// // const { Strategy } = require('passport-local');
// const boom = require('@hapi/boom');
// const bcrypt = require ('bcrypt');
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;
const { Strategy } = require('passport-local');


// const UserService = require('./../../../services/user.service');
// const service = new UserService();

const AuthService = require('./../../../services/auth.service');
const service = new AuthService();


const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

/*  remplazamos esta funcion por la anterior
passport.use(new LocalStrategy({
  // se esta manera recie los nombres en el request
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      // valida si encuentra el usuario
      if(!user){
        done(boom.unauthorized(), false)
      }

      user.password;
      const isMatch = await bcrypt.compare(password, user.password); // comparamos el hash

      // si el password no es correcto, muestra el mensaje de no autorizado
      if(!isMatch){
        done(boom.unauthorized('No estas autorizado.'), false)
      }

      delete user.dataValues.password
      // si no hay error, enviamos el usuario que tiene la información
      done(null, user);
    } catch (error) {
      // si algo sale mal, se ejecuta el done y el false para enviar el error
      done(error, false);
    }
  }
));
*/

module.exports = LocalStrategy;


