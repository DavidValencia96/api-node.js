'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {

  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(USER_TABLE);
  }
};
