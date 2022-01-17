const jwt = require('jsonwebtoken');
const { USER } = require("../models");
const { ACCESS_TOKEN_SECRET } = require('../const');

const _checkUserExist = async (email) => {
  const user = await USER.findOne({
    where: {
      email,
    }
  });

  if (user) {
    return true;
  }
  return false;
}

const registerValidator = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'name, email, password required.'
    });
  }

  const isExist = await _checkUserExist(email);
  if (isExist) {
    return res.status(409).json({
      message: 'email already used.',
    });
  }

  next();
}

const authValidator = async (req, res, next) => {
  const token = req.headers['access-token'];
  const result = await jwt.verify(token, ACCESS_TOKEN_SECRET);
  console.log({ result });
  next();
}

module.exports = {
  registerValidator,
  authValidator,
}