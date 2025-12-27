const express = require('express');
const { connectDB } = require('./config/database');
const Userdata = require('./modal/userSchema');

const { userAuth, adminAuth } = require('./middlewares/index');
const app = express();

connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
      console.log('Server started now this listen 7777 port');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.use(express.json());

//create user API
app.post('/signup', async (req, res, next) => {
  const clientObject = req.body;
  console.log(clientObject);
  try {
    const newUser = new Userdata(clientObject);
    await newUser.save();
    res.send('User signed up successfully');
  } catch (error) {
    res.status(500).send('Error signing up user');
  }
});

//get single user API
app.post('/user', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Userdata.findOne({ email: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching single user');
  }
});

//delete user API
app.delete('/user', async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const user = await Userdata.findByIdAndDelete(id);
    if (user) {
      res.json('User deleted successfully');
    } else {
      res.status(404).send('User ID found and deleted');
    }
  } catch (error) {
    res.status(500).send('Error deleting user by ID');
  }
});

//get multiple user API
app.get('/user', async (req, res) => {
  try {
    const user = await Userdata.find({});
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching Multiple user');
  }
});

//get user by ID API
app.post('/findById', async (req, res) => {
  const { userID } = req.body;
  try {
    const user = await Userdata.findById(userID);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User ID found');
    }
  } catch (error) {
    res.status(500).send('Error fetching By ID user');
  }
});

//update user by emailId API
app.patch('/user', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await Userdata.findByIdAndUpdate(id, req.body);
    if (user) {
      res.json('User updated successfully');
    } else {
      res.status(404).send('User ID found update');
    }
  } catch (error) {
    res.status(500).send('Error updating By ID user');
  }
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
