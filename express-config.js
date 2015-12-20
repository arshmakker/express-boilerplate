import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import _MongoStore from 'connect-mongo';
let MongoStore = _MongoStore(session);

export default function(app) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ 'extended': false }));
  app.use(cookieParser());
  app.use(express.static(__dirname + '/public'));

  if (process.env.NODE_ENV === 'production') {
    app.use(session({
      'secret': 'secret_key',
      'cookie': {'maxAge': 1209600000},
      'store': new MongoStore({
        'url': process.env.MONGOLAB_URI
      }),
      'resave': true,
      'saveUninitialized': true
    }));
  } else {
    app.use(session({
      'secret': 'secret_key',
      'cookie': {'maxAge': 1209600000},
      'store': new MongoStore({
        'db': 'express-boiler'
      }),
      'resave': true,
      'saveUninitialized': true
    }));
  }

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
}
