const jwt = require('jsonwebtoken');

const secret = 'myCat';


// expiración de token
// const jwtConfig = {
//   // expiresIn: '1d',
//   expiresIn: '1h',
// }


// Lo que se va a encriptar en el token
const payload = {
  sub: 1, // forma en que se va a identificar al usuario
  role: 'customer'  // permisos
}

function signToken(payload, secret) {
  return  jwt.sign(payload, secret);
}

// const token = signToken (payload, secret, jwtConfig);
const token = signToken (payload, secret);

console.log(token);

