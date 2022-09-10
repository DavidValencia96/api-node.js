'use strict';

// const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { USER_TABLE } = require('./../models/user.model');
const { DataTypes, } = require('sequelize');

module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    // await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role); // Le definimos cual es el esquema a agregar
    await queryInterface.addColumn(USER_TABLE, 'role', { // fix crear rol
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    });
  },

  down: async  (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role'); // Para realizar el revert
  }
};
