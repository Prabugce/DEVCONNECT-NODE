const express = require('express');
const { userAuth, adminAuth } = require('./middlewares/index');
const app = express();
app.listen(7777, () => {
  console.log('Server started now this listen 7777 port');
});

app.use('/user', userAuth);

app.get('/user/fetch', (req, res, next) => {
  res.send('User fetched successfully');
});

app.get('/user/add', (req, res, next) => {
  res.send('User added successfully');
});

app.get('/admin', adminAuth, (req, res, next) => {
  res.send('Admin route accessed successfully');
});
