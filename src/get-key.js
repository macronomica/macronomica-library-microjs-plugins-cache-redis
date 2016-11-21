import isFunction from 'lodash.isfunction';
import isPlainObject from 'lodash.isplainobject';
import set from './set-key';

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
          .then(result => set(micro, client)(key, result))
          .then(resolve, reject);
      }
    }
    
    resolve(result);
  });
});