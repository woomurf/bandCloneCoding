require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { USER } = require('../models');
const { registerValidator } = require('../middleware/auth');
const router = express.Router();
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ITERATION,
  ISS,
} = require('../const');

// access token을 secret key 기반으로 생성
const generateAccessToken = (email) => {
  return jwt.sign({ iss: ISS, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
  });
};

// refersh token을 secret key  기반으로 생성
const generateRefreshToken = (email) => {
  return jwt.sign({ iss: ISS, email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7 days",
  });
};

const createSalt = async () => {
  const salt = (await crypto.randomBytes(64)).toString();
  return salt;
}

const createHashedPassword = async (plainPassword) => {
  const salt = await createSalt();
  const password = (await crypto.pbkdf2(plainPassword, salt, ITERATION, 64, "sha512")).toString('base64');
  return { password, salt }
}

const verifyPassword = async (password, salt, hash) => {
  const hashedPassword = (await crypto.pbkdf2(password, salt, ITERATION, 64, "sha512")).toString('base64');
  if (hash === hashedPassword) {
    return true;
  }
  return false;
}


router.post('/register', registerValidator, async (req, res) => {
  const { name, email, password } = req.body;

  // TODO(hyeonwoong): check name, email, password rule.

  try {
    const { hash, salt } = await createHashedPassword(password);
    const user = await USER.create({
      name,
      email,
      password: hash,
      salt,
    });

    return res.json({
      id: user.id,
    });
  } catch (error) {
    console.error(`[Register] ${error}`);
    return res.status(500).json({
      messages: 'Failed to register.'
    });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const _user = await USER.findOne({
      where: {
        email
      }
    });

    if (!_user) {
      return res.status(400).json({
        message: 'user not exist'
      });
    }

    const valid = await verifyPassword(password, _user.salt, _user.password);
    if (!valid) {
      return res.status(400).json({
        message: 'Incorrect password.'
      });
    }

    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    _user.refreshToken = refreshToken;
    _user.save();

    res.json({
      id: _user.id,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to login'
    });
  }
})

module.exports = router;
