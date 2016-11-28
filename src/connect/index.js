import redis from 'redis';
import ErrorHandler from './../utils/error-handler';
import retryStrategy from './retry-strategy';

export default (micro, plugin, settings = {}) => new Promise((resolve, reject) => {
  const errorHandler = ErrorHandler(micro);
  const client = redis
    .createClient({
      retry_strategy: retryStrategy,
      ...settings
    });
  
  client
    .on("error", errorHandler)
    .on("ready", error => {
      if (error) {
        micro.logger.error(`Ошибка подключения к Redis:`, {
          id: plugin.id,
          error
        });

        return reject(error);
      }
      micro.logger.info(`Создано подключение к Redis:`, {
        id: plugin.id,
        payload: { ...settings }
      });

      resolve(client);
    });
});