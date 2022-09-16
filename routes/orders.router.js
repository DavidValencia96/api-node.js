const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validationHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();


router.get('/',
  passport.authenticate('jwt', {session: false}), // requiere token para acceder
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}), // requiere token para acceder
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}), // requiere token para acceder
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      // const body = req.body;
      const body = {  // En el body se enviaría el sub del payload como body.
        userId: req.user.sub
      };
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  passport.authenticate('jwt', {session: false}), // requiere token para acceder
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
