"use strict";

const jwt = require('jsonwebtoken');

require('dotenv').config();

const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '2d';

// Генерація access токена
const generateAccessToken = (userId: number): string => {
  const accessToken: string = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  return accessToken;
};

// Генерація refresh токена
const generateRefreshToken = (userId: number): string => {
  const refreshToken: string = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  return refreshToken;
};

// Перевірка access токена
const verifyAccessToken = (accessToken: string): any | null => {
  try {
    const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Перевірка refresh токена
const verifyRefreshToken = (refreshToken: string): any | null => {
  try {
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error('Помилка перевірки refresh токена:', error);
    return null;
  }
};

function authenticateToken(req: any, res: any, next: Function) {
  const accessToken: string = req.cookies.access_token;
  const refreshToken: string = req.cookies.refresh_token; 

  console.log(req.cookies);

  next();
}


export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authenticateToken,
};