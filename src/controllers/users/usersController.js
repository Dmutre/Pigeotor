"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Pool } = require("pg");
const DBConfig = require("../../config/DBConfig.js");
const token = require("../../middleware/JWTmiddleware.js");
const pool = new Pool(DBConfig);
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, name } = req.body;
        try {
            const query = 'INSERT INTO users (username, email, password, name) VALUES ($1, $2, $3, $4) RETURNING id';
            const values = [username, email, password, name];
            const result = yield pool.query(query, values);
            const userId = result.rows[0].id;
            const accessToken = token.generateAccessToken(userId);
            const refreshToken = token.generateRefreshToken(userId);
            res.cookie('access_token', accessToken, { httpOnly: true });
            res.cookie('refresh_token', refreshToken, { httpOnly: true });
            res.status(201).redirect("/");
        }
        catch (error) {
            console.error('Помилка при створенні користувача:', error);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    });
}
function findUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
            const values = [username, password];
            const result = yield pool.query(query, values);
            const userId = result.rows[0].id;
            const accessToken = token.generateAccessToken(userId);
            const refreshToken = token.generateRefreshToken(userId);
            res.cookie('access_token', accessToken, { httpOnly: true });
            res.cookie('refresh_token', refreshToken, { httpOnly: true });
            res.status(201).redirect("/");
        }
        catch (error) {
            console.error('Помилка при створенні користувача:', error);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    });
}
function signupMenu(req, res) {
    res.render("auth/signupForm");
}
function loginMenu(req, res) {
    res.render("auth/login");
}
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = token.verifyRefreshToken(req.cookies.refresh_token);
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const values = [data.userId];
            const result = yield pool.query(query, values);
            console.log(result.rows[0]);
            res.render("profile/main", { result: result.rows[0] });
        }
        catch (error) {
            console.error('Помилка при створенні користувача:', error);
            res.render("profile/main", ({ result: "Error" }));
        }
    });
}
function updateUserProfile(req, res) {
    res.render("profile/main");
}
module.exports = {
    createUser,
    signupMenu,
    loginMenu,
    findUser,
    getUserProfile,
    updateUserProfile
};
