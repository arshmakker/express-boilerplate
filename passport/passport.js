import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import User from '../models/user';

export default function(passport) {
  passport.serializeUser((user, done)=> {
    done(null, user._id);
  });

  passport.deserializeUser((id, done)=> {
    User.findOne({'_id': id}, (err, user)=> {
      if (err) {
        return done(err);
      }
      done(err, user);
    });
  });

  passport.use('local',
    new Strategy({
      // Login with email instead of username(default)
      'usernameField': 'loginEmail',
      'passwordField': 'loginPassword'
    }, (email, password, done)=> {
      User.findOne({
        'email': email
      }, (err, user)=> {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (error, res)=> {
          if (res) {
            return done(null, user);
          }
          if (error) {
            return done(err);
          }
          return done(new Error('Passwords did not match'));
        });
      });
    }
  ));
}
