import ensureAuth from './passport/ensure-authenticated';
import authHandler from './handlers/auth-handlers';
import emailHandler from './handlers/email-handlers';

// Check if user is already logged-in
function checkIfLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

export default function(app) {
  // Authentication routes
  app.get('/api/register',
    checkIfLoggedIn,
    authHandler.getRegister);

  app.post('/api/register',
    checkIfLoggedIn,
    authHandler.register);

  app.get('/api/login',
    checkIfLoggedIn,
    authHandler.getLogin);

  app.post('/api/login',
    checkIfLoggedIn,
    authHandler.login);

  app.get('/api/logout',
    ensureAuth,
    authHandler.logout);

  app.get('/api/forgot-password',
    checkIfLoggedIn,
    authHandler.getForgotPassword);

  app.post('/api/send-new-password',
    checkIfLoggedIn,
    emailHandler.sendNewPassword);
}
