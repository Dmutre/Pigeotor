"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '2d';
// Генерація access токена
const generateAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
// Генерація refresh токена
const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
// Перевірка access токена
const verifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
// Перевірка refresh токена
const verifyRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        console.error('Помилка перевірки refresh токена:', error);
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
function authenticateToken(req, res, next) {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    console.log(req.cookies);
    next();
}
exports.authenticateToken = authenticateToken;
