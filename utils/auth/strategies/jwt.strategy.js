const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const  options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // de donde obtendra eltoken
  secretOrKey: config.jwtSecret // verifica o compara
}

const JwtStrategy = new Strategy(options, (payload, done) =>{
  return done(null, payload); // retorna el payload que verifico
});

module.exports = JwtStrategy;


