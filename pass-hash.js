const bcrypt = require ('bcrypt');

async function hashPassword(){
  const myPassword = 'admin 123 .202';
  const hash = await bcrypt.hash(myPassword, 10); // se realiza el hash y (10) son los saltos que va a realizar
  console.log(hash);
}

hashPassword();
