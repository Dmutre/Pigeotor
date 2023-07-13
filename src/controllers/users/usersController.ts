"use strict";

const { Pool } = require("pg");
const DBConfig = require("../../config/DBConfig.js");

const pool = new Pool( DBConfig );

async function createUser(req: any, res: any) {
  const status: string = "user";
  const { username, email, password, name }: 
  { username: string, email: string, password: string, name: string } = req.body;

  try {

    const query: string = 'INSERT INTO users (username, email, password, name, status) VALUES ($1, $2, $3, $4, $5)';
    const values: string[] = [username, email, password, name, status];

    await pool.query(query, values);

    res.status(201).json({ message: 'Користувач успішно створений' });
  } catch (error) {
    console.error('Помилка при створенні користувача:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

module.exports = {
  createUser
}