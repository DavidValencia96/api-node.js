const jwt = require('jsonwebtoken');
const express = require('express');
// const passport = require('passport');
const auth = require('../utils/auth');

const router = express.Router();

const { config } = require('./../config/config');


router.post('/login',
  auth.authenticate('local', {session: false}), // le indicamos el metodo de autenticacion (local) y que no se manejara sesiones
  async (req, res, next) => {
    // si todo pasa bien, se deberia de encontrar el request.user
    try {

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
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
