const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;

    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    // return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {} // si no hay algun objeto, esto se envia en vacio
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit; // limite de datos a mostrar
      options.offset = offset; // offset:: desde donde inicia a mostra (desde el producto 1, 2 o 3 ... )
    }

    const { price } = query;
    if (price) {
      options.where.price = price; // ejecuta el query para consulta productos por un precio en especifico
    }

    /*
      doc Sequelize provides several operators.
      https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    */
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min, //  gte ::: mayor o igual
        [Op.lte]: price_max, //  lte ::: menor o igual
      }
    }

    const products = await models.Product.findAll(options); // le envio parametro options para paginación
    return products;

    // consulta con pool "https://node-postgres.com/features/pooling"
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows;

    // consulta por sequelize "https://node-postgres.com/features/pooling"
    // const query = 'SELECT * FROM tasks';
    // const [data] = await sequelize.query(query);
    // return {
    //   data
    // };

    // return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
