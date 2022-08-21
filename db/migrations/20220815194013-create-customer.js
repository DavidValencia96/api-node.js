'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
