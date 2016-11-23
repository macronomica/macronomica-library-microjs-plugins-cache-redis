import ErrorHandler from './../utils/error-handler';
import retryStrategy from './retry-strategy';

export default (micro, redis, settings) => new Promise((resolve, reject) => {
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
        errorHandler(error);
        return reject(error);
      }
      
      resolve(client);
    });
});