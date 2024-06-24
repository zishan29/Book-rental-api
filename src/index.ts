import app from './app';
import logger from './utils/logger';

app.listen(process.env.PORT || 3000, () => {
  logger.info('Server started on port', process.env.PORT || 3000);
});
