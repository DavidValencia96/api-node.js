const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Para conexiones con Postgres -- recordar habilitar puerto en archivo .ENV
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Para conexiones con MySql -- recordar habilitar puerto en archivo .ENV
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize( URI , {
  // Para conexiones con Postgres
  dialect: 'postgres',

  // Para conexiones con MySql
  // dialect: 'mysql',
  logging: true,

});

setupModels(sequelize); // Recibe la conexión de cada modelo

// sequelize.sync(); // Le indicamos que realice una sincronización, pero es mejor que todo se maneje por medio de migraciones

module.exports = sequelize;
