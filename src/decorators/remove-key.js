export default (micro, client) => (key) => new Promise((resolve, reject) => {
  client.del(key, function (err, result) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.del/${ err.code }`,
        message: `Попытка удаления ключа ${ key } привела к ошибке`
      });
    }
    
    resolve(result);
  });
});