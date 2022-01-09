const { USER } = require("../models");

const _checkUserExist = async (email) => {
  const user = await USER.findOne({
    where: {
      email,
    }
  });

  if (!user) {
    return true;
  }
  return false;
}

const registerValidator = (req, res, next) => {
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

exports = {
  registerValidator,
}