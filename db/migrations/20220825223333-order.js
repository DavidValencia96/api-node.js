'use strict';

const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');

module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(ORDER_TABLE);
  }
};
