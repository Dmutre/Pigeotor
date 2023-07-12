"use strict";
//This file is for dev use, there I create databases from Node.js. So it is not important file

const { Pool } = require("pg");
const DBConfig = require("../config/DBConfig.js");

const pool = new Pool( DBConfig );

async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) NOT NULL
      );
    `);
    console.log('Таблиця користувачів створена успішно');
  } catch (error) {
    console.error('Помилка при створенні таблиці користувачів', error);
  } finally {
    client.release();
  }
}

createTables();