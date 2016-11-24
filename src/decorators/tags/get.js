import { TAGS_KEY } from './constants';

export default (micro, client) => (...tags) => new Promise((resolve, reject) => {
  client.hmset(TAGS_KEY, ...result.keys, function (err, result) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.tag/${ err.code }`,
        message: `Попытка установки тегов ${ tags.join(',') } привела к ошибке`
      });
    }

    resolve(result.tags);
  });
});