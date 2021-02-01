'use strict';

const database = require('../infrastructure/database');

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

async function updateUser(nombre, apellido1, apellido2, dni, nick, pass, avatar, email, role, id){
  const pool = await database.getPool();
  const updateQuery = 'UPDATE usuario SET nombre = ?, apellido1 = ?, apellido2 = ?, dni = ?, nick = ?, pass = ?, avatar = ?, email = ?, role = ? WHERE id = ?';
  await pool.query(updateQuery, [nombre, apellido1, apellido2, dni, nick, pass, avatar, email, role, id]);

  return true;
}
  
module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserByNick,
  createUser,
  updateUser
};