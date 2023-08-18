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
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL,
      bio VARCHAR(150),
      profile_picture BYTEA,
      created_at TIMESTAMP DEFAULT NOW(),
      role_id INTEGER NOT NULL DEFAULT 2 REFERENCES roles(id)
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