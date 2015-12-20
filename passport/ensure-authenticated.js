// Check if user is authenticated via Passport's method
export default function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/register');
}
