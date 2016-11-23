import isFunction from 'lodash.isfunction';
import upcast from '../utils/upcast';
import write from './write-key';

export default (micro, client) => (key, callback, options = {}) => new Promise((resolve, reject) => {
  client.get(key, function (err, result) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.get/${ err.code }`,
        message: `Попытка получения ключа ${ key } привела к ошибке`
      });
    }
    
    if (result === null) {
      
      if (isFunction(callback)) {
        let promise = callback(key);
        
        if (!promise || !('then' in promise && isFunction(promise.then))) {
          promise = Promise.resolve(promise);
        }
        
        return promise
          .then(result => write(micro, client)(key, result))
          .then(resolve, reject);
      }
      
      return resolve(result);
    }
    
    let { type, value } = JSON.parse(result);
    
    resolve(upcast.to(value, type));
  });
});