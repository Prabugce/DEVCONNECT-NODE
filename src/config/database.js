const connectToDatabase = require('mongoose');

const connectDB = async () => {
  await connectToDatabase.connect(
    'mongodb+srv://prabugce0622_db_user:XjUem4rpnCkCtMKf@node-learning.icrm7kh.mongodb.net/devTinder'
  );
};

module.exports = { connectDB };
