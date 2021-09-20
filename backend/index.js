const express = require('express');
const userRouter = require('./routes/user');


const PORT = process.env.port || 3000;
const app = express();

app.use('/user', userRouter);

app.get('/health', (req, res) => {
  res.json('HEALTHY');
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
