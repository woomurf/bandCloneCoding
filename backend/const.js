const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'SECRET_KEY';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_KEY';
const ITERATION = Number(process.env.ITERATION) || 10000;
const ISS = 'GOMUJUL';

const LoginResultCode = {
    SUCCESS: 0,
    USER_NOT_EXIST: 1,
    INCORRECT_PASSWORD: 2,
}

const RegisterResultCode = {
    SUCCESS: 0,
    ID_IN_USE: 1
}

const UnexpectedErrorCode = 999;

module.exports = {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ITERATION,
    ISS,
    LoginResultCode,
    RegisterResultCode,
    UnexpectedErrorCode,
}