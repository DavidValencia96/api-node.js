const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')


const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
    unique: true,
    references: {
      model: USER_TABLE, // Tabla para realizar la relación
      key: 'id', // Columna de la cual se hara la relación
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}


class Customer extends Model {

  //  Generamos la asociación entre usuario(rol) y customer
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'order',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}



module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };

