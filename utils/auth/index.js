const passport = require('passport');

// Estrategias a utilizar
const LocalStrategy = require('./strategies/local.strategy');



// passport.use(LocalStrategy);
passport.use(LocalStrategy)

module.exports = passport
