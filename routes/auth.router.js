// const jwt = require('jsonwebtoken');
const express = require('express');
// const passport = require('passport');

const auth = require('../utils/auth');
const AuthService = require('./../services/auth.service');


const router = express.Router();
const service = new AuthService();

const validatorHandler = require('../middlewares/validator.handler');
const { loginAuthSchema, recoveryAuthSchema, changePasswordAuthSchema } = require('./../schemas/auth.schema');

// const { config } = require('./../config/config');


router.post('/login',
  validatorHandler(loginAuthSchema, 'body'),
  auth.authenticate('local', {session: false}), // le indicamos el metodo de autenticacion (local) y que no se manejara sesiones
  async (req, res, next) => {
    // si todo pasa bien, se deberia de encontrar el request.user
    try {
      const user = req.user;
      res.json(service.signToken(user));

      /*
      const user = req.user;
      // JWT
      const payload = {
        sub: user.id, // forma en que se va a identificar al usuario
        role: user.role  // permisos
      }
      const token = jwt.sign(payload, config.jwtSecret);

      // retornarmos datos user + token
      res.json({
        user,
        token
      });
    */
    } catch (error) {
      next(error);
    }
  }
);


router.post('/recovery',
  validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const {email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);


router.post('/change-password',
  validatorHandler(changePasswordAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
