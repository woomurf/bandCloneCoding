require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models/index');
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comment');
const fileUploadRouter = require('./routes/upload-image');
const fileRouter = require('./routes/file');

const { makeImageFolder } = require('./utils/googleDrive');

const PORT = process.env.PORT || 4000;
const app = express();

// DB initialize
db.sequelize.sync()
  .then(() => {
    console.log('Connect on DB');
  })
  .catch((error) => {
    console.error('Failed to connect on DB');
    console.error(error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/upload-image', fileUploadRouter);
app.use('/file', fileRouter);

app.get('/health', (req, res) => {
  res.json('HEALTHY');
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
  makeImageFolder();
});
