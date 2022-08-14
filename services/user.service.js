// const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres');

const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
    // return data;
  }

  async find() {
    // const client = await getConnection();
    // const response = await client.query('SELECT * FROM tasks');

    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async update(id, changes) {

    const user = await this.findOne(id); // Reutilizamos codigo
    const rta = user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id); // Reutilizamos codigo y lo utilizamos las veces que lo requiramos
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
