const connectToDatabase = require('mongoose');

const connectDB = async () => {
  await connectToDatabase.connect(
    'mongodb+srv://prabugce0622_db_user:XjUem4rpnCkCtMKf@node-leave-learning.cwnwpzm.mongodb.net/devTinder'
  );
};

module.exports = { connectDB };
