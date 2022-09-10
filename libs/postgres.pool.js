const { Pool } = require('pg');

const { config } = require('./../config/config');

let URI = '';

// validamos si estamos en producción o en desarrollo
if (config.isProd) {
  URI = config.dbUrl
}
else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

}



const pool = new Pool ({ connectionString: URI });

// Reemplazamos la conexión normal, por la conformada en url

// const pool = new Pool ({
//   host: 'localhost',
//   port: 5432,
//   user: 'nico',
//   password: 'admin123',
//   database: 'my_store'
// });



module.exports = pool;




