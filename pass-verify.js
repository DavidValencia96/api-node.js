const bcrypt = require ('bcrypt');

async function verifyPassword(){
  const myPassword = 'admin 123 .202'; // contraseña actual -- password en crudo
  // console.log(myPassword);

  const hash = '$2b$10$aF6j2TC0U/nbzqQyBGKcHutIlDxKUMf2p0x3cYlp9HYwZ65SB7DEu'; // Hash generado de pass-hash.js
  // console.log(hash);
  
  const isMatch = await bcrypt.compare(myPassword, hash); // comparamos el hash
  console.log(isMatch);
}

verifyPassword();
