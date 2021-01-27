'use strict';

const database = require('../infrastructure/database');

async function getNews() {
    const pool = await database.getPool();
    const query = 'SELECT * FROM noticias';

    const [noticia] = await pool.query(query);

    return noticia
}

async function getNewsById() {
    const pool = await database.getPool();
    const query = 'SELECT * FROM noticias WHERE id = ?'

    const [noticia] = await pool.query(query)

    return noticia[0]
}

async function createNew(titular, contenido, f_publicacion) {
    const pool = await database.getPool();
    const insertQuery = 'INSERT INTO noticias (titular, contenido, f_publicacion) VALUES (?, ?, ?)';
    const [created] = await pool.query(insertQuery, [titular, contenido, f_publicacion]);

    return created.insertId
}

module.exports = {
    getNews,
    getNewsById,
    createNew
}