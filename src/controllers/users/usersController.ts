"use strict";

const { Pool } = require("pg");
const DBConfig = require("../../config/DBConfig");
const token = require("../../middleware/JWTmiddleware");
const fs = require("fs");

const pool = new Pool( DBConfig );

async function createUser(req: Request, res: Response) {
  const { username, email, password, name, bio }: 
  { username: string, email: string, password: string, name: string, bio: string } = req.body;

  try {
    const file: any = req.files.profilePicture; // Тепер req.files має бути визначене

    if (!file) {
      throw new Error('Profile picture is missing');
    }

    const base64Image = file.data.toString('base64');

    const query: string = 'INSERT INTO users (username, email, password, name, bio, profile_picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const values: any[] = [username, email, password, name, bio, base64Image];

    const result: any = await pool.query(query, values);
    const userId: number = result.rows[0].id;

    token.generateTokens(res, userId);//generate refresh and access tokens and send them in cookie

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

    token.generateTokens(res, userId);

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
  res.locals.title = "Pigeotor login";
  res.render("auth/login");
}

async function getUserProfile(req: Request, res: Response) {
  const data = token.verifyAccessToken(req.cookies.access_token);

  try {
    const query: string = 'SELECT * FROM users WHERE id = $1';
    const values: string[] = [data.userId];

    const result: object = await pool.query(query, values);
    const username: string = result.rows[0].username;

    res.locals.title = username;

    res.render("profile/main", {username, result: result.rows[0]});
  } catch(error) {
    console.error('Помилка при створенні користувача:', error);
    const username: string = "error";
    res.locals.title = username;
    res.render("profile/main", {username, result: "Error"} );
  }
}

async function getEditProfile(req: Request, res: Response) {
  res.locals.title = "Edit profile";
  const data = token.verifyAccessToken(req.cookies.access_token);
  
  try {
    const query: string = 'SELECT * FROM users WHERE id = $1';
    const values: string[] = [data.userId];
    const result: object = await pool.query(query, values);

    const profile: object = {
      username: result.rows[0].username,
      bio: result.rows[0].bio,
    }
    console.log(profile);

    res.render("profile/edit", {profile: profile});
  } catch(err) {
    console.log(err);
    res.redirect("/");
  }
}

async function updateUserProfile(req: Request, res: Response) {
  const data = token.verifyAccessToken(req.cookies.access_token);
  
  try {
    let query: string;
    let values: any[];
    const file: any = req.files.profilePicture;

    query = 'UPDATE users SET username = $1, bio = $2, profile_picture = $3 WHERE id = $4';
    const base64Image = file.data.toString('base64');
    values = [req.body.username, req.body.bio, base64Image, data.userId];

    await pool.query(query, values);
    
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
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
  getEditProfile,
  updateUserProfile,
  logout,
}