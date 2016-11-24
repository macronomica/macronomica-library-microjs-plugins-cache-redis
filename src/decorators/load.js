import isFunction from 'lodash.isfunction';
import upcast from '../utils/upcast';
import save from './save';

export default (micro, client) => (key, callback, options = {}) => new Promise((resolve, reject) => {
  client.hgetall(key, function (err, result) {
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
          .then(result => save(micro, client)(key, result))
          .then(resolve, reject);
      }

      return resolve(result);
    }

    let { type, value } = result;

    resolve(JSON.parse(value, function(key, value) {
      if (!!value && !!value.search && !!~value.search(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[A-Z]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[\.]{1}[0-9]{3}[A-Z]{1}$/)) {
        return new Date(value);
      }
      return value;
    }));
  });
});