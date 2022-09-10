const { config } = require('./../config/config');


// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


// como enviamos config.dburl, se elige el entorno (dev or production)
module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false
    }
  }
  // development: {
  //   url: URI,
  //   dialect: 'postgres',
  // },
  // production: {
  //   url: URI,
  //   dialect: 'postgres',
  // }
}


