const boom = require('@hapi/boom');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();


class AuthService {
  async getUser(email, password){
    const user = await service.findByEmail(email);
    // valida si encuentra el usuario
    if(!user){
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password); // comparamos el hash

    // si el password no es correcto, muestra el mensaje de no autorizado
    if(!isMatch){
      throw boom.unauthorized('No estas autorizado.'), false
    }

    // datos a eliminar en el response del login
    delete user.dataValues.id;
    delete user.dataValues.createAt;
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    // valida si encuentra el usuario
    if(!user){
      throw boom.unauthorized();
    }
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecretRecovery, {expiresIn: '15min'});
    const link = `http://app-node-api.com.co/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});

    const mail = {
      from: config.mailerUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Correo de restablecimiento de contraseña APP{name}", // Subject line
      // text: "Correo de prueba NODE MAILER", // plain text body
      html: `<b>Ingresa a este link para restablecer la contraseña: ${link} </b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery); // verificamos el token
      const user = await service.findOne(payload.sub); // se obtiene el sub del usuario

      if (user.recoveryToken !== token){
        throw boom.unauthorized('Error token');
      }
      const hash = await bcrypt.hash(newPassword, 10); // Generador de hash
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'Password changed successfully.' };
    } catch (error) {
      throw boom.unauthorized('Token invalid, try again.');
    }
  }


  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      host: "smtp.gmail.com",
      // port: 587, // puerto ethereal.email
      port: 465, // puerto gmail
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.mailerUser,
        pass: config.mailerPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent successfully.' }
  }

}


module.exports = AuthService;


