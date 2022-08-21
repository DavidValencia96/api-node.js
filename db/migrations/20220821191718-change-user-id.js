'use strict';

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', { // enviamos el array de los datos que vamos a cambiar unicamente
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async  (queryInterface) => {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
