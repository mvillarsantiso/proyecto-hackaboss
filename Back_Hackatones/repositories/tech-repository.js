'use strict';

const database = require('../infrastructure/database');

async function getTech(){
    const pool = await database.getPool();
    const query = 'SELECT * FROM tecnologia';
    const [tech] = await pool.query(query);

    return tech
}

module.exports = {
    getTech
}