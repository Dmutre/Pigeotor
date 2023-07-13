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
const pool = new Pool(DBConfig);
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = "user";
        console.log("Gotten data:\n" + JSON.stringify(req.body));
        const { username, email, password, name } = req.body;
        try {
            const query = 'INSERT INTO users (username, email, password, name, status) VALUES ($1, $2, $3, $4, $5)';
            const values = [username, email, password, name, status];
            yield pool.query(query, values);
            res.status(201).json({ message: 'Користувач успішно створений' });
        }
        catch (error) {
            console.error('Помилка при створенні користувача:', error);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    });
}
function signupMenu(req, res) {
    res.render("signup/signupForm");
}
module.exports = {
    createUser,
    signupMenu,
};
