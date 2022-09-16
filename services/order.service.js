const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  // async create(data) {
  //   const newOrder = await models.Order.create(data);
  //   return newOrder;
  // }

/*
  Modificamos el create() para que la inserción sea automatizada con solo enviar el sub o userId,
  hacemos una busqueda findOne al customer Where user .id sea igual a data.userId. Donde este se
  almacenará en customer el cual tendremos que extraer el ID para enviarlo al create de order.
  Si no se encuentra se regresa un no encontrado.
*/

    async create(data) {
      const customer = await models.Customer.findOne({
        where: {
          '$user.id$': data.userId
        },
        include: ['user']
      })
      if (!customer) {
        throw boom.badRequest('Customer not found');
      }
      const newOrder = await models.Order.create({ customerId: customer.id });
      return newOrder;
    }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }



  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId // consulta por las asociaciones que tiene una orden
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
      ]
    });

    return orders;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
