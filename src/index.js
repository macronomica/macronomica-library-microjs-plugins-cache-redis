import middleware from 'redis';
import del from './del-key';
import set from './set-key';
import get from './get-key';
const DRIVER = 'redis';

export default ({ driver:DRIVER, ...connection } = {}) => (micro, name, pluginId) => {
  const plugin = { name, id: pluginId };
  let client;
  
  micro
    .queue({
      case: 'wait',
      args: [],
      done: () => new Promise((resolve, reject) => {
        client = middleware.createClient({
          ...connection,
          retry_strategy: retryStrategy
        });
  
        client
          .on("error", errorCallback(micro))
          .on("ready", error => {
            if (error) {
              errorCallback(micro)(error);
              return reject(error);
            }
            
            resolve();
          })
        ;
      })
    })
    .queue({
      case: 'close',
      args: [],
      done: () => new Promise((resolve, reject) => {
        if (!client) {
          return resolve();
        }
        
        client.quit();
        process.nextTick(() => resolve());
      })
    });

  return {
    middleware,
    client() { return client },
    get: (...rest) => get(micro, client)(...rest),
    del: (...rest) => del(micro, client)(...rest),
    set: (...rest) => set(micro, client)(...rest)
  }
}

function retryStrategy(options) {
  if (options.error.code === 'ECONNREFUSED') {
    // End reconnecting on a specific error and flush all commands with a individual error
    return new Error('The server refused the connection');
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands with a individual error
    return new Error('Retry time exhausted');
  }
  if (options.times_connected > 10) {
    // End reconnecting with built in error
    return undefined;
  }
  // reconnect after
  return Math.max(options.attempt * 100, 3000);
}

function errorCallback(micro) {
  return error => {
    if (!!error) {
      micro.logger.error('The server refused the connection', {
        code   : `error.plugin-cache-redis/${ error.code }`,
        message: error.message.toString()
      })
    }
  }
}