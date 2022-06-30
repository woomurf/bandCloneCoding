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
  LoginResultCode,
  UnexpectedErrorCode,
} = require('../const');

// access token을 secret key 기반으로 생성
const generateAccessToken = (email) => {
  return jwt.sign({ iss: ISS, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "120m",
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
  const password = (crypto.pbkdf2Sync(plainPassword, salt, ITERATION, 64, "sha512")).toString('base64');
  return { password, salt }
}

const verifyPassword = async (password, salt, hash) => {
  const hashedPassword = (crypto.pbkdf2Sync(password, salt, ITERATION, 64, "sha512")).toString('base64');
  if (hash === hashedPassword) {
    return true;
  }
  return false;
}

router.post('/register', registerValidator, async (req, res) => {
  const { name, email, password, birth, profileImageUrl } = req.body;

  // TODO(hyeonwoong): check name, email, password rule.
  try {
    const { password: hash, salt } = await createHashedPassword(password);
    const user = await USER.create({
      name,
      email,
      password: hash,
      salt,
      birth: new Date(birth),
      profileImageUrl,
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
        code: LoginResultCode.USER_NOT_EXIST,
        message: '유저가 존재하지 않습니다. 이메일을 확인해주세요.'
      });
    }

    const valid = await verifyPassword(password, _user.salt, _user.password);
    if (!valid) {
      return res.status(400).json({
        code: LoginResultCode.INCORRECT_PASSWORD,
        message: '올바른 비밀번호가 아닙니다.'
      });
    }

    const accessToken = generateAccessToken(_user.email);
    const refreshToken = generateRefreshToken(_user.email);

    _user.refreshToken = refreshToken;
    _user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true });

    res.json({
      code: LoginResultCode.SUCCESS,
      message: 'Success',
      data: {
        id: _user.id,
        accessToken,
        refreshToken,
      }
    });
  } catch (error) {
    res.status(500).json({
      code: UnexpectedErrorCode,
      message: '시스템 상의 문제로 로그인에 실패했습니다. 관리자에게 연락해주세요.',
    });
  }
})

router.post('/logout', async (req, res) => {
  const accessToken = req.cookies['accessToken'];
  if (!accessToken) {
    return res.status(400).json({
      message: 'User already was logout.'
    });
  }

  res.cookie('accessToken', null, { httpOnly: true });
  return res.status(201).json({
    message: 'Success logout'
  });
});

module.exports = router;
