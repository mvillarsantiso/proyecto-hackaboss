'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
// const sengrid = require('@sendgrid/mail');

const { userRepository } = require('../repositories');

async function getUsers(req, res) {
    try {
      const users = await userRepository.getUsers();
  
      res.send(users);
    } catch (err) {
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message });
    }
}

// async function getScores(req,res) {
//   try {
//     const scores = await userRepository.getScoresFromUsers();

//     res.send(scores);
//   }catch (err) {
//     if(err.name === 'ValidationError'){
//       err.status = 400;
//     }
//     console.log(err);
//     res.status(err.status || 500);
//     res.send({ error: err.message });
//   }
// }

async function register(req, res) {
    try{
      const registerSchema = Joi.object({
        nombre: Joi.string().required(),
        apellido1: Joi.string().required(),
        apellido2: Joi.string().required(),
        dni: Joi.string().min(9).max(9).required(),
        nick: Joi.string().alphanum().min(6).max(15).required(),
        password: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().required(),
        repeatEmail: Joi.ref('email'),
        repeatPassword: Joi.ref('password'),
      });
  
      await registerSchema.validateAsync(req.body);

      const avatar = typeof req.files['avatar'] !== "undefined" ? req.files['avatar'][0].filename : '';

      await req.checkBody('avatar').isImage(avatar);
  
      const { nombre, apellido1, apellido2, dni, nick, password, email} = req.body;
      const userEmail = await userRepository.getUserByEmail(email);
      const userNick = await userRepository.getUserByNick(nick);
  
      if (userEmail) {
        const error = new Error({error: 'Ya existe un usuario con ese email'});
        error.status = 409;
        throw error;
      }else if (userNick) {
        const error = new Error({error: 'Ya existe un usuario con ese nick'});
        error.status = 409;
        throw error;
      }
      
      const passwordHash = await bcrypt.hash(password, 10);
      const id = await userRepository.createUser( nombre, apellido1, apellido2, dni, nick, passwordHash, avatar, email);
  
      
      // sengrid.setApiKey(process.env.SENDGRID_KEY);
      // const data = {
      //   from: process.env.SENDGRID_MAIL_FROM,
      //   to: email,
      //   subject: 'WorldofHackaton',
      //   text: `Hola ${nombre}.\n<strong>Bienvenido a WorldofHackaton.\n`,
      //   html: `Hola ${nombre}.\n<strong>Bienvenido a WorldofHackaton.\n`
      // };
      // await sengrid.send(data);
  
      return res.send({ userId: id });
    }catch(err){
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message });
    }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required(),
      });
      await schema.validateAsync({ email, password });
  

      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        const error = new Error({error: 'No existe el usuario con ese email'});
        error.code = 404;
        throw error;
      }

        console.log(user);
      const isValidPassword = await bcrypt.compare(password, user.pass);
  
      if (!isValidPassword) {
        const error = new Error({error: 'El password no es válido'});
        error.code = 401;
        throw error;
      }


      const tokenPayload = { id: user.id, name: user.name, role: user.role };
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '30d' },
      );
      
      res.send(token);
    }catch(err) {
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message });
    }
}

async function getUserInfo(req, res) {
    try {
      const userId = req.auth.id;
      const user = await userRepository.getUserById(userId);
  
      res.send(user);
    } catch (err) {
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message });
    }
}

module.exports = {
    getUsers,
    getUserInfo,
    register,
    login
};
