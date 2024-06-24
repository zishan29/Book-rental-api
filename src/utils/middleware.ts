import logger from './logger';
import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send('Unknown endpoint');
};

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err);
  if (err.name === 'JsonWebTokenError') {
    res.status(401).send('Unauthorized').json({ error: 'token is invalid' });
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).send('Unauthorized').json({ error: 'token has expired' });
  }

  _next(err);
};

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.split(' ')[1];
  }
  next();
};

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor };
