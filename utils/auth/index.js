const passport = require('passport');

// Estrategias a utilizar
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');



// passport.use(LocalStrategy);
passport.use(LocalStrategy)
passport.use(JwtStrategy)

module.exports = passport
