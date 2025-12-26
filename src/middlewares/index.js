const userAuth = (req, res, next) => {
  let token = 'xyz';
  let isAuthenticated = token === 'yz';
  console.log('Middleware executed');
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

const adminAuth = (req, res, next) => {
  let token = 'xyz';
  let isAuthenticated = token === 'xyz';
  console.log('admin Middleware executed');
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send('admin Unauthorized');
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
