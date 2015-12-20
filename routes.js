import ensureAuth from './passport/ensure-authenticated';
import authHandler  from './handlers/auth-handlers';

// Check if user is already logged-in
function checkIfLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

export default function(app) {
  /** Authentication routes
   * Handled by Auth Handlers (handlers/auth-handlers)
   **/
  app.get('/register', checkIfLoggedIn, authHandler.getRegister);
  app.post('/register', checkIfLoggedIn, authHandler.register);
  app.get('/login', checkIfLoggedIn, authHandler.getLogin);
  app.post('/login', checkIfLoggedIn, authHandler.login);
  app.get('/logout', ensureAuth, authHandler.logout);
  app.get('/forgot-password', checkIfLoggedIn, authHandler.getForgotPassword);
  app.post('/send-new-password', checkIfLoggedIn, authHandler.sendNewPassword);
}
