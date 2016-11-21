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
        return set(micro, client)(key, callback(key))
          .then(resolve)
          .catch(reject);
      }
    }
    
    resolve(result);
  });
});