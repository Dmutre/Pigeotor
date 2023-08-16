"use strict";

import { NextFunction } from "express";

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

const updateAccessToken = (refreshToken: string): string => {
  const decodedRefreshToken: Object = verifyRefreshToken(refreshToken);
  const newAccessToken: string = generateAccessToken(decodedRefreshToken.userId);
  return newAccessToken;
}

// Перевірка access токена
const verifyAccessToken = (accessToken: string | null): any | null => {
  try {
    const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Перевірка refresh токена
const verifyRefreshToken = (refreshToken: string | null): any | null => {
  try {
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error('Помилка перевірки refresh токена:', error);
    return null;
  }
};

//If user doesn`t have something as refresh token, we define him like guest and let earlier created in database guest`s id
function defineGuest(res: Response) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  const access_token: string = generateAccessToken(process.env.GUEST_ID);
  const refresh_token: string = generateRefreshToken(process.env.GUEST_ID);
  res.cookie('access_token', access_token, { httpOnly: true });
  res.cookie('refresh_token', refresh_token, { httpOnly: true });
}

//Big function that we use as middleware to handle with JWT security
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const accessToken: string | undefined = req.cookies.access_token;
  const refreshToken: string | undefined = req.cookies.refresh_token; 

  if (!refreshToken) {
    console.log("We welcome guest");
    defineGuest(res);
    return next();
  }

  console.log("We are here");

  const decodedAccessToken: Object | null = verifyAccessToken(accessToken);
  const decodedRefreshToken: Object | null = verifyRefreshToken(refreshToken);

  if (decodedRefreshToken === null) {
    defineGuest(res);
    return next();
  } else if (decodedAccessToken === null && decodedRefreshToken !== null) {
    const newAccessToken: string = updateAccessToken(refreshToken);
    res.cookie('access_token', newAccessToken, { httpOnly: true });
    return next();
  }
  return next();
}


export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authenticateToken,
};