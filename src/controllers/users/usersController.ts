"use strict";

const { Pool } = require("pg");
const DBConfig = require("../../config/DBConfig.js");
const token = require("../../middleware/JWTmiddleware.js");

const pool = new Pool( DBConfig );

async function createUser(req: Request, res: Response) {
  const { username, email, password, name }: 
  { username: string, email: string, password: string, name: string } = req.body;

  try {
    const query: string = 'INSERT INTO users (username, email, password, name) VALUES ($1, $2, $3, $4) RETURNING id';
    const values: string[] = [username, email, password, name];

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

async function findUser(req: Request, res: Response) {
  const { username, password }: 
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

    res.status(201).redirect("/profile");
  } catch(error) {
    console.error('Помилка при створенні користувача:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

function signupMenu(req: Request, res: Response) {
  res.render("auth/signupForm");
}

function loginMenu(req: Request, res: Response) {
  res.render("auth/login");
}

async function getUserProfile(req: Request, res: Response) {
  const data = token.verifyRefreshToken(req.cookies.refresh_token)

  try {
    const query: string = 'SELECT * FROM users WHERE id = $1';
    const values: string[] = [data.userId];

    const result: any = await pool.query(query, values);
    console.log(result.rows[0]);

    res.render("profile/main", {result: result.rows[0]});
  } catch(error) {
    console.error('Помилка при створенні користувача:', error);
    res.render("profile/main", ({ result: "Error" }));
  }
}

function updateUserProfile(req: Request, res: Response) {
  res.render("profile/main");
}

function logout(req: Request, res: Response) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/");
}

module.exports = {
  createUser,
  signupMenu,
  loginMenu,
  findUser,
  getUserProfile,
  updateUserProfile,
  logout,
}