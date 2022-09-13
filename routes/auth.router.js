const express = require('express');
// const passport = require('passport');
const auth = require('../utils/auth');

const router = express.Router();


router.post('/login',
  auth.authenticate('local', {session: false}), // le indicamos el metodo de autenticacion (local) y que no se manejara sesiones
  async (req, res, next) => {
    // si todo pasa bien, se deberia de encontrar el request.user
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
