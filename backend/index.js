const express = require('express');
const db = require('./models/index');
const userRouter = require('./routes/user');

const PORT = process.env.port || 3000;
const app = express();

// DB initialize
db.sequelize.sync()
  .then(() => {
    console.log('Connect on DB');
    console.log(db);
  })
  .catch((error) => {
    console.error('Failed to connect on DB');
    console.error(error);
  });

app.use('/user', userRouter);

app.get('/health', (req, res) => {
  res.json('HEALTHY');
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
