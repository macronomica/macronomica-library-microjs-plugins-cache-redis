import isPlainObject from 'lodash.isplainobject';

export default (micro, client) => (key, value) => new Promise((resolve, reject) => {
  let v = value;
  
  if (isPlainObject(v)) {
    v = JSON.stringify(value);
  }
  
  client.set(key, v, function (err, result) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.set/${ err.code }`,
        message: `Попытка установки ключа ${ key } привела к ошибке`
      });
    }
    
    resolve(value);
  });
});