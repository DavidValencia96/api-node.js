const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2MzI5NzIxNn0.ZiDxS7nSfhw8_hWIRBOlhvqUlYy_xOm_lsbtG5kdvKg';

function verifyToken(token, secret) {
  return  jwt.verify(token, secret);
}

const payload = verifyToken (token, secret);

console.log(payload);

