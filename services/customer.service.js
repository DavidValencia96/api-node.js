const boom = require('@hapi/boom');
const bcrypt = require ('bcrypt');


const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']  // le decimos que queremos resolver la asociación de datos
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10); // Generador de hash
    const newData = {
      ...data, // clonamos la información
      user: {
        ...data.user, // pasamos la información clonada al subobjeto
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });

     // retornamos todos los datos sin el password
     delete newCustomer.user.dataValues.password; // eliminar password que retorna (solo para sequelize - postgres)
     delete newCustomer.user.dataValues.recoveryToken;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
