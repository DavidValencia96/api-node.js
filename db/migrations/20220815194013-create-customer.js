'use strict';

// const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { USER_TABLE } = require('./../models/user.model');
const { DataTypes, Sequelize } = require('sequelize');
module.exports = {
  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    // await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createAt: { // con este formado en JS
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at', // con este formado en la tabla de la db
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE, // Tabla para realizar la relación
          key: 'id', // Columna de la cual se hara la relación
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
