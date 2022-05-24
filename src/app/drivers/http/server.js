import express from 'express';
import configureLocales from '../../../config/configure-locales';
import router from '../../api/http/router';
import handleDomainErrors from '../../api/http/middlewares/handle-domain-errors';
import container from '../../container';
import DecodeTokenMiddleware from '../../api/http/middlewares/token';
import { adapt } from './express-middleware-adapter';
import PathNotFoundMiddleware from '../../api/http/middlewares/path-not-found';

const startExpressServer = () => {
  const app = express();
  const i18n = configureLocales();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(i18n.init);

  app.use(adapt(container.resolve(DecodeTokenMiddleware)));

  app.use('/', router);

  app.use(adapt(container.resolve(PathNotFoundMiddleware)));
  app.use(handleDomainErrors);

  return app;
};

export default startExpressServer;
