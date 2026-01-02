const express = require('express');
const { connectDB } = require('./config/database');
const Userdata = require('./modal/userSchema');
const bcrypt = require('bcrypt');

const { userAuth, adminAuth } = require('./middlewares/index');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

//create user API
app.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const newUser = new Userdata({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.send('User signed up successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Login API
app.post('/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Userdata.findOne({ email: email });

    if (user) {
      // const match = await bcrypt.compare(password, user.password);

      const match = await user.passwordVerify(password);

      if (!match) return res.status(401).send('Invalid credentials');
      const token = jwt.sign({ userId: user._id }, 'secretkey', {
        expiresIn: '1m',
      });

      res.cookie('userToken', token, { httpOnly: true, sameSite: 'lax' });
      return res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('ERROR:' + error.message);
  }
});

//get multiple user API
app.get('/user', userAuth, async (req, res) => {
  try {
    console.log('Authenticated user:', req.user);
    const user = await Userdata.find({});
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching multiple user' + error.message);
  }
});

//delete user API
app.delete('/user', async (req, res) => {
  const { id } = req.body;
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
    //const user = await Userdata.findByIdAndUpdate(id, req.body);
    const user = await Userdata.findByIdAndUpdate(
      id,
      { $set: req.body, $currentDate: { updatedAt: true } },
      { new: true, runValidators: true }
    );

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
