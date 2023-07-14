"use strict";

const jwt = require("jsonwebtoken");

//Підключаємо секретні токени для генерації JWT
require('dotenv').config();

// Генерація access токена
const generateAccessToken = (userId: number): string => {
  const accessToken: string = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1s' });
  return accessToken;
};

// Генерація refresh токена
const generateRefreshToken = (userId: number): string => {
  const refreshToken: string = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
  return refreshToken;
};

const verifyAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const { exp } = decoded;
    const currentTimestamp = Math.floor(Date.now() / 1000); // Поточний час в секундах

    if (currentTimestamp > exp) {
      console.log('Токен застарів');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Помилка перевірки access токена:', error);
    return null;
  }
};

// Перевірка refresh токена
const verifyRefreshToken = (refreshToken: string): any | null => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
    return decoded;
  } catch (error: any) {
    console.error('Помилка перевірки refresh токена:', error);
    return null;
  }
};

console.log(verifyAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY4OTM0NDE4NiwiZXhwIjoxNjg5MzQ0MTg3fQ.gq99dCiHSRAmxdIIJPDJVTL-e02lto9RqnVvEFep8Ho"));