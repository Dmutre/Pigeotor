"use strict";
const jwt = require("jsonwebtoken");
//Підключаємо секретні токени для генерації JWT
require('dotenv').config();
// Генерація access токена
const generateAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    return accessToken;
};
// Генерація refresh токена
const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
    return refreshToken;
};
const verifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const { exp } = decoded;
        const currentTimestamp = Math.floor(Date.now() / 1000); // Поточний час в секундах
        if (currentTimestamp > exp) {
            console.log('Токен застарів');
            return null;
        }
        return decoded;
    }
    catch (error) {
        console.error('Помилка перевірки access токена:', error);
        return null;
    }
};
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
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
