import isFunction from 'lodash.isfunction';

export default (micro, client, { tagget, save }) => (key, callback, { tags } = {}) => new Promise((resolve, reject) => {
  client.hgetall(key, function (err, res) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.get/${ err.code }`,
        message: `Попытка получения ключа ${ key } привела к ошибке`
      });
    }

    if (res === null) {

      if (isFunction(callback)) {
        let promise = callback(key);

        if (!promise || !('then' in promise && isFunction(promise.then))) {
          promise = Promise.resolve(promise);
        }

        return promise
          .then(result => save(key, result, { tags }))
          .then(resolve, reject);
      }

      return resolve(res);
    }
    
    if (!Array.isArray(tags)) {
      return resolve(JSON.parse(res.value, parseReviver));
    }
  
    tagget(...tags)
      .then(originalTags => {
        if (hasTagUpdated(tags, originalTags)) {
          return resolve(null);
        }
        
        resolve(JSON.parse(res.value, parseReviver));
      });
  });
});

function hasTagUpdated(tags, originalTags) {
  return Object.keys(originalTags).some(key => originalTags[ key ] === tags[ key ]);
}

function parseReviver(key, value) {
  if (!!value && !!value.search && !!~value.search(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[A-Z]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}[\.]{1}[0-9]{3}[A-Z]{1}$/)) {
    return new Date(value);
  }
  return value;
}