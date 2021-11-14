const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');

const PORT = process.env.port || 3000;
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

app.use('/user', userRouter);
app.use('/group', groupRouter);

app.get('/health', (req, res) => {
  res.json('HEALTHY');
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
