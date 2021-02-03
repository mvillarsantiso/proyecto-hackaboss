'use strict';

const database = require('../infrastructure/database');

const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const {ensureDir} = require('fs-extra');

async function getUsers(){
  const pool = await database.getPool();
  const query = 'SELECT * FROM usuario';
  const [usuario] = await pool.query(query);

  return usuario;
}

async function getUserByEmail(email){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM usuario WHERE email = ?';
  const [usuario] = await pool.query(query, email);

  return usuario[0];
}

async function getUserById(id){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM usuario WHERE id = ?';
  const [usuario] = await pool.query(query, id);

  return usuario[0];
}

async function getUserByNick(nick){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM usuario WHERE nick = ?';
  const [usuario] = await pool.query(query, nick);

  return usuario[0];
}

async function createUser(nombre, apellido1, apellido2, dni, nick, pass, avatar, email, role){
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO usuario (nombre, apellido1, apellido2, dni, nick, pass, avatar, email, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [created] = await pool.query(insertQuery, [nombre, apellido1, apellido2, dni, nick, pass, avatar, email, role]);

  return created.insertId;
}

async function updateUser(nombre, apellido1, apellido2, dni, nick, email, id){
  console.log(nombre, apellido1, apellido2, dni, nick, email, id)
  const pool = await database.getPool();
  const updateQuery = 'UPDATE usuario SET nombre = ?, apellido1 = ?, apellido2 = ?, dni = ?, nick = ?, email = ? WHERE id = ?';
  await pool.query(updateQuery, [nombre, apellido1, apellido2, dni, nick, email, id]);

  return true;
}

async function updateUserPass(pass, id) {
  const pool = await database.getPool();

  const updateQuery = 'UPDATE usuario SET pass = ? WHERE id = ?';
  await pool.query(updateQuery, [pass, id]);

  return true;
}

async function uploadAvatar(file) {
  //Crear o directorio uploads si no existe
  const uploadsPath = path.join(__dirname, '..', process.env.UPLOADS_DIR);
  await ensureDir(uploadsPath);

  //Leer imaxe
  const image = sharp(file.data)

  //cambiar o tamaño
  const avatarSize = Number(process.env.AVATAR_SIZE);
  image.resize(avatarSize,avatarSize);

  //Xenerar un nome aleatorio para a imaxe
  const avatarFileName = `${uuid.v4()}.jpg`;

  //Gardala no directorio uploads
  await image.toFile(path.join(uploadsPath, avatarFileName));

  //devolver a ruta
  return avatarFileName;
}
  
module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserByNick,
  createUser,
  updateUser,
  updateUserPass,
  uploadAvatar
};