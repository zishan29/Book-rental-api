import config from './utils/config';
import express from 'express';
import middleware from './utils/middleware';
import cors from 'cors';
import logger from './utils/logger';
import userRouter from './controllers/userController';
import loginRouter from './controllers/loginController';

const app = express();

logger.info(`Connecting to ${config.DB_URL}`);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
