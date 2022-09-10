'use strict';

// const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { ORDER_TABLE } = require('./../models/order.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { DataTypes, Sequelize } = require('sequelize');


module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    // await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(ORDER_TABLE);
  }
};
