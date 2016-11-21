import upcast from './utils/upcast';

export default (micro, client) => (key, value) => new Promise((resolve, reject) => {
  let v = {
    type: upcast.type(value),
    value
  };
  
  client.set(key, JSON.stringify(v), function (err, result) {
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