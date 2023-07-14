"use strict";

const { Pool } = require("pg");
const DBConfig = require("../../config/DBConfig.js");
const token = require("../../middleware/authmiddleware.js");

const pool = new Pool( DBConfig );

async function createUser(req: any, res: any) {
  const status: string = "user";
  const { username, email, password, name }: 
  { username: string, email: string, password: string, name: string } = req.body;

  try {
    const query: string = 'INSERT INTO users (username, email, password, name, status) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    const values: string[] = [username, email, password, name, status];

    const result: any = await pool.query(query, values);
    const userId: number = result.rows[0].id;

    const accessToken: string = token.generateAccessToken(userId);
    const refreshToken: string = token.generateRefreshToken(userId);

    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.status(201).redirect("/");
  } catch (error) {
    console.error('Помилка при створенні користувача:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

async function findUser(req: any, res: any) {
  const { username, password}: 
  { username: string, password: string } = req.body;

  try {
    const query: string = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values: string[] = [username, password];

    const result: any = await pool.query(query, values);
    const userId: number = result.rows[0].id;

    const accessToken: string = token.generateAccessToken(userId);
    const refreshToken: string = token.generateRefreshToken(userId);

    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.status(201).redirect("/");
  } catch(error) {
    console.error('Помилка при створенні користувача:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

function signupMenu(req: any, res: any) {
  res.render("auth/signupForm");
}

function loginMenu(req: any, res: any) {
  res.render("auth/login");
}

module.exports = {
  createUser,
  signupMenu,
  loginMenu,
  findUser,
}