import middleware from 'redis';
import get from './../get-key';
import del from './../del-key';
import set from './../set-key';

const micro = {
  logger: { error: err => console.error(err) }
};
const client = middleware.createClient();

const delWrapper = del(micro, client);
const getWrapper = get(micro, client);
const setWrapper = set(micro, client);

getNullValue()
  .then(getValueAsCallback)
  .then(getValue)
  .then(setValue)
  .then(() => Promise.all([
    delWrapper('test-get'),
    delWrapper('test-run-cb'),
    delWrapper('test-set-object')
  ]))
  .then(() => client.quit())
;

function getNullValue() {
  return getWrapper('test-get').then(success, error);
}

function getValueAsCallback() {
  return getWrapper('test-run-cb', key => {
    console.log(`Данных для ключа ${ key } нет, вставляем новые`);
    return { id: 1 };
  }).then(success, error);
}

function getValue() {
  return getWrapper('test-run-cb').then(success, error);
}

function setValue() {
  return setWrapper('test-set-object', { id: 2 }).then(success, error);
}

function success(result) {
  console.log(result);
}

function error(error) {
  console.error(error);
}