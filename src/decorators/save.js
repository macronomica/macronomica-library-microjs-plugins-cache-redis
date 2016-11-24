import upcast from '../utils/upcast';

export default (micro, client) => (key, value, { tags = [] } = {}) => new Promise((resolve, reject) => {
  const hash = [
    'type' , upcast.type(value),
    'value', JSON.stringify(value)
  ];

  client.hmset(key, ...hash, function (err, result) {
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