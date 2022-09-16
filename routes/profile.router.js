const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

/*
  Para utilizar este EndPoint es necesario que este logueado el usuario el cual tiene la orden,
  si se consulta con otro usuario diferente, el servicio no traera  ningun dato.
*/
router.get('/my-orders',
  passport.authenticate('jwt', {session: false}), // requiere token para acceder
  async (req, res, next) => {
    try {
      const user = req.user; //obtenemos todos los datos (token)
      const orders = await service.findByUser(user.sub); // se toma la sesión del user.sub
      res.json(orders);
    }
    catch (error) {
      next(error);
    }
  }
);

module.exports = router;
