'use strict';

const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('./../models/order-product.model');

module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
