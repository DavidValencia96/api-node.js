const { Pool } = require('pg');

const { config } = require('./../config/config');

// let URI = '';
const options = {}


// validamos si estamos en producción o en desarrollo
if (config.isProd) {
  // URI = config.dbUrl;
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  }
}
else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool (options);

// Reemplazamos la conexión normal, por la conformada en url

// const pool = new Pool ({
//   host: 'localhost',
//   port: 5432,
//   user: 'nico',
//   password: 'admin123',
//   database: 'my_store'
// });



module.exports = pool;




