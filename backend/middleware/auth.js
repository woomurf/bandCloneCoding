const jwt = require('jsonwebtoken');
const { USER } = require("../models");
const { ACCESS_TOKEN_SECRET } = require('../const');

const _getUserInstance = async (email) => {
  const user = await USER.findOne({
    where: {
      email,
    }
  });

  return user || null;
}

const registerValidator = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'name, email, password required.'
    });
  }

  const isExist = await _getUserInstance(email);
  if (isExist) {
    return res.status(409).json({
      message: 'email already used.',
    });
  }

  next();
}

const authValidator = async (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Token required.'
    });
  }

  try {
    const decodedToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = _getUserInstance(decodedToken.id);
    res.locals.user = user;
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to verify token',
    });
  }
  next();
}

module.exports = {
  registerValidator,
  authValidator,
}