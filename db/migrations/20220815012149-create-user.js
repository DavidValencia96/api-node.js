'use strict';

// const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { USER_TABLE } = require('./../models/user.model');
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {

  // Inicio de la creación de la migración
  up: async (queryInterface)  => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createAt: { // con este formado en JS
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at', // con este formado en la tabla de la db
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async  (queryInterface) => {
   await queryInterface.dropTable(USER_TABLE);
  }
};
