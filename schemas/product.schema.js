const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(254);
const price = Joi.number().integer().min(1);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer().min(1);
const price_max = Joi.number().integer().min(1);

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {  // si se envia un price_min, por obligación se debe de enviar un price_max
    is: Joi.number().integer(), // el campo es requerido
    then: Joi.required() // si el valor es un entero es requerido
  })
});


module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }


