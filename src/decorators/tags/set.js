import { TAGS_KEY } from './constants';

export default (micro, client) => (...tags) => new Promise((resolve, reject) => {
  const result = reduceTags(tags);

  client.hmset(TAGS_KEY, ...result.keys, function (err, res) {
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

export function reduceTags(tags) {
  return tags.reduce((result, tag) => {
    result.tags[ tag ] = Date.now();
    result.keys.push(tag);
    result.keys.push(result.tags[ tag ]);
    return result;
  }, { keys: [], tags: {} });
}