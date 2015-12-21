import express from 'express';
const app = express();
import mongoose from 'mongoose';

let uri = '';
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGOLAB_URI;
  console.log('===PRODUCTION===');
} else {
  uri = '127.0.0.1/express-boiler';
  console.log('===DEVELOPMENT===');
}

mongoose.connect(uri, {}, (err)=> {
  if (err) {
    console.log('Connection Error: ', err);
  } else {
    console.log('Successfully Connected');
  }
});

import routes from './routes';

// import ensureAuth from './passport/ensure-authenticated';
// import authHandler from './handlers/auth-handlers';
// import emailHandler from './handlers/email-handlers';
// let router = express.Router();

// // Check if user is already logged-in
// function checkIfLoggedIn(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   return res.redirect('/');
// }

// router.get('/api/register',
//   checkIfLoggedIn,
//   authHandler.getRegister);

// router.post('/api/register',
//   checkIfLoggedIn,
//   authHandler.register);

// router.get('/api/login',
//   checkIfLoggedIn,
//   authHandler.getLogin);

// router.post('/api/login',
//   checkIfLoggedIn,
//   authHandler.login);

// router.get('/api/logout',
//   ensureAuth,
//   authHandler.logout);

// router.get('/api/forgot-password',
//   checkIfLoggedIn,
//   authHandler.getForgotPassword);

// router.post('/api/send-new-password',
//   checkIfLoggedIn,
//   emailHandler.sendNewPassword);

let port = process.env.PORT || 4000;
app.listen(port, ()=> {
  console.log('Server started at port number: ', port);
});
