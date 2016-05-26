
/**
* Module dependencies.
*/
import express from 'express'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'
import errorHandler from 'errorhandler'
import path from 'path'
import assert from 'assert'
import routes from './routes'


export let AppConfig = () => {
  let app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');
  app.use(favicon("public/images/favicon.png"));
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(cookieParser('1234'));
  app.use(session({secret: '1234', saveUninitialized: true, resave: true}));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(errorHandler());

  app.use('/', routes);

  return app;
}
