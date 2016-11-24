import { TAGS_KEY } from './constants';

export default (micro, client) => (...tags) => new Promise((resolve, reject) => {
  const hasManyTags = tags.length;
  
  hasManyTags
    ? client.hmget(TAGS_KEY, ...tags, callback)
    : client.hgetall(TAGS_KEY, callback);

  function callback(err, result) {
    if (err) {
      micro.logger.error(err);
      return reject({
        code   : `error.plugin-cache-redis.tag/${ err.code }`,
        message: `Попытка установки тегов ${ tags.join(',') } привела к ошибке`
      });
    }
    
    if (result === null || !hasManyTags) {
      return resolve(result);
    }
    
    resolve(reduced(tags, result));
  }
});

function reduced(keys, values) {
  return keys.length > values.length
    ? reduceKeys(keys, values)
    : reduceValues(keys, values);
}

function reduceKeys(keys, values) {
  return keys.reduce((result, key, i) => Object.assign(result, { [ key ]: values[ i ] }), {});
}

function reduceValues(keys, values) {
  return values.reduce((result, value, i) => Object.assign(result, { [ keys[ i ] ]: value }), {});
}