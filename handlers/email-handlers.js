import Mailgun     from 'mailgun-js';
import bcrypt      from 'bcrypt';
import md5         from 'md5';
import User from '../models/user';

let email = {
  sendNewPassword(req, res) {
    let emailInput = req.user.email;
    let newPass = newPassword();
    let newMD5pass = md5(newPass);

    bcrypt.genSalt(10, (err0, salt)=> {
      if (err0) {
        return res.status(400).send('Error on generating new password');
      }
      bcrypt.hash(newMD5pass, salt, (err1, hash)=> {
        if (err1) {
          return res.status(400).send('Error on creating new password');
        }
        let query  = {'email': emailInput};
        let update = {'$set': {'password': hash}};

        User.findOneAndUpdate(query, update, (err2, user)=> {
          if (err2) {
            return res.status(400).send('Error on finding user');
          }

          if (user && emailInput === user.email) {
            let mailgun = new Mailgun({
              'apiKey': process.env.API_KEY,
              'domain': process.env.DOMAIN
            });

            let data = {
              'from': `Express-Boiler Admin <postmaster@'#{process.env.DOMAIN}>`,
              'to': user.email,
              'subject': '[Seleny Admin] - Password Reset',
              'html': emailTemplate(user.username, newPass)
            };

            mailgun.messages().send(data, (err3, body)=> {
              if (err3) {
                return res.status(400).send('Error on sending email');
              }
              return res.status(200).send('Successfully sent to your email');
            });
          }
        });
      });
    });
  }
};

function emailTemplate(username, password) {
  let htmlMsg =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'+
  '<html xmlns="http://www.w3.org/1999/xhtml">' +
    '<body>' +
       `<p>Hey ${username},</p>'` +
       '<p>You requested to reset the password</p>' +
       `<p>Your new password is: <strong>${password}</strong></p>` +
       '<br/>' +
      '<p>All the best.</p>' +
    '</body>' +
  '</html>';
  return htmlMsg;
}

function newPassword() {
  let newPass = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    newPass += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return newPass;
}

export default email;

