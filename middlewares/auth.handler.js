const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey == config.apiKey) {
    next();
  }
  else{
    next(boom.unauthorized());
  }
}

// validador de rol
function checkAdminRole(req, res, next){
  // console.info(req.user);

  // validamos si el usuario es administrador
  const user = req.user;
  if(user.role == 'admin'){
    next();
  }
  else{
    // next(boom.unauthorized());
    next(boom.unauthorized('No tienes los permisos suficientes para ejecutar esta acción.'));
  }
}

/// los 3 puntos de (...roles) significa que convierte los datos en un array
function checkRoles(...roles){
  return (req, res, next) => {
    const user = req.user;
    // console.log(roles);
    // valida el rol de usuario para ejecutar X acción
    if(roles.includes(user.role)){
      next();
    } else{
      next(boom.unauthorized('No tienes los permisos suficientes para ejecutar esta acción.'));
      // next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };

