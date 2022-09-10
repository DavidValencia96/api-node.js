const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model')
const { PRODUCT_TABLE } = require('./product.model')


const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createAt: { // con este formado en JS
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', // con este formado en la tabla de la db
    defaultValue: Sequelize.NOW
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE, // Tabla para realizar la relación
      key: 'id', // Columna de la cual se hara la relación
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE, // Tabla para realizar la relación
      key: 'id', // Columna de la cual se hara la relación
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}


class OrderProduct extends Model {

  //  Generamos la asociación entre usuario(rol) y customer
  static associate(models){
    
    // this.belongsTo(models.User, {as: 'user'});
    // this.hasMany(models.Order, {
    //   as: 'order',
    //   foreignKey: 'customerId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}



module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };

