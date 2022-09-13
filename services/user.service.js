// const getConnection = require('../libs/postgres');

const boom = require('@hapi/boom');
const bcrypt = require ('bcrypt');

const { models } = require('./../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10); // Generador de hash
    const newUser = await models.User.create({
      ...data, // clonamos todo el objeto data
      password: hash // reasignamos el password
    });

    // retornamos todos los datos sin el password
    delete newUser.dataValues.password; // eliminar password que retorna (solo para sequelize - postgres)

    return newUser;
    // return data;
  }

  async find() {
    // const client = await getConnection();
    // const response = await client.query('SELECT * FROM tasks');

    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }
  

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email } // traer el primer resultado que de la DB cumpla con la consulta
    });
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
