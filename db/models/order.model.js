const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model')


const ORDER_TABLE = 'orders';

const OrderSchema = {
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
  value: {
    type: DataTypes.VIRTUAL, // esto solo sera virtual y no estara en ninguna tabla de la db
    get(){
      if (this.items && this.items.length > 0){ // tiene que ser el mismo nombre de this.belongsToMany(models.Product, { as: 'item' .... }
        return this.items.reduce((value, item) => {
          return value + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  }
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer',
		});
    // el model order, tiene una relación hacia muchos prodcutos
    this.belongsToMany(models.Product, {
      as: 'items', // el nombre que se ponga aqui, tiene que ser el mismo que va en total-> this.item.length
      through: models.OrderProduct, // se resolvera de esta manera con los siguientes indicadores
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: 'Order',
			timestamps: false,
		};
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };


