"use strict";

const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const sengrid = require("@sendgrid/mail");

const { userRepository } = require("../repositories");

const DEFAULT_USER_ROLE = "DEFAULT_USER";

async function getUsers(req, res) {
  try {
    const users = await userRepository.getUsers();

    res.send(users);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const registerSchema = Joi.object({
      nombre: Joi.string().required(),
      apellido1: Joi.string().required(),
      apellido2: Joi.string().required(),
      dni: Joi.string().min(9).max(9).required(),
      nick: Joi.string().alphanum().min(6).max(15).required(),
      password: Joi.string().min(4).max(20).required(),
      email: Joi.string().email().required(),
      repeatEmail: Joi.ref("email"),
      repeatPassword: Joi.ref("password"),
    });


    await registerSchema.validateAsync(req.body);

    const {
      nombre,
      apellido1,
      apellido2,
      dni,
      nick,
      password,
      email,
    } = req.body;
    const userEmail = await userRepository.getUserByEmail(email);
    const userNick = await userRepository.getUserByNick(nick);

    if (userEmail) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    } else if (userNick) {
      const error = new Error("Ya existe un usuario con ese nick");
      error.status = 409;
      throw error;
    }

    let avatarFileName;

    if (req.files && req.files.avatar) {
      avatarFileName = await userRepository.uploadAvatar(req.files.avatar);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await userRepository.createUser(
      nombre,
      apellido1,
      apellido2,
      dni,
      nick,
      passwordHash,
      avatarFileName,
      email,
      DEFAULT_USER_ROLE
    );

    sengrid.setApiKey(process.env.SENDGRID_API_KEY);
    const data = {
      to: email,
      from: process.env.SENDGRID_MAIL_FROM,
      subject: "WorldofHackaton",
      text: `Hola ${nombre}.\n<strong>Bienvenido a WorldofHackaton.\n`,
      html: `Hola ${nombre}.\n<strong>Bienvenido a WorldofHackaton.\n`,
    };
    await sengrid
      .send(data)
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        console.log(err);
      });

    return res.send({ userId: id });
  } catch (err) {
    if (err.name === "ValidationError") {
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
      const error = new Error("No existe el usuario con ese email");
      error.status = 404;
      throw error;
    }

    console.log(user);
    const isValidPassword = await bcrypt.compare(password, user.pass);

    if (!isValidPassword) {
      const error = new Error("El password no es válido");
      error.status = 401;
      throw error;
    }

    const tokenPayload = { id: user.id, name: user.name, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ token: token, user: user });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function getUserInfo(req, res) {
  try {
    console.log(req)
    const userId = req.auth.id;
    const user = await userRepository.getUserById(userId);

    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const {
      nombre,
      apellido1,
      apellido2,
      dni,
      nick,
      password,
      email,
    } = req.body;

    const updateSchema = Joi.object({
      userId: Joi.number().positive().required(),
      nombre: Joi.string(),
      apellido1: Joi.string(),
      apellido2: Joi.string(),
      dni: Joi.string().min(9).max(9),
      nick: Joi.string().alphanum().min(6).max(15),
      password: Joi.string().min(4).max(20),
      email: Joi.string().email(),
    });

    await updateSchema.validateAsync({
      userId,
      nombre,
      apellido1,
      apellido2,
      dni,
      nick,
      password,
      email,
    });

    const user = await userRepository.getUserById(userId);


    await userRepository.updateUser(
      nombre || user.nombre,
      apellido1 || user.apellido1,
      apellido2 || user.apellido2,
      dni || user.dni,
      nick || user.nick,
      email || user.email,
      userId
    );

    res.send({ userId: userId });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function updateUserPass(req, res) {
  try {
    const { userId } = req.params;

    if (Number(userId) !== req.auth.id) {
      const error = new Error('No puedes cambiar la password a otro usuario');
      error.status = 401;
      throw error;
    }

    const { password, newPassword } = req.body;

    const user = await userRepository.getUserById(userId);

    const isValidPassword = await bcrypt.compare(password, user.pass);

    if (!isValidPassword) {
      const error = new Error('El password antiguo no es válido');
      error.status = 401;
      throw error;
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await userRepository.updateUserPass(newPasswordHash, userId);

    res.send({
      status: 'ok',
      message: `Password del usuario ${userId} actualizada`
    })


  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function uploadAvatar(req, res) {

  try {
    let avatarFileName;

    if (req.files && req.files.avatar) {
      avatarFileName = await userRepository.uploadAvatar(req.files.avatar);
    }

    res.send({ file: avatarFileName });

  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
  }
}

async function updateAvatar(req, res) {

  try {
    let avatarFileName;


    if (req.files && req.files.avatar) {
      avatarFileName = await userRepository.uploadAvatar(req.files.avatar);
    }

    res.send({ file: avatarFileName });

  } catch (err) {
    if (err.name === "ValidationError") {
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
  login,
  updateUser,
  updateUserPass,
  uploadAvatar,
  updateAvatar
};
