import chai from 'chai';
import Plugin from '../index';
import { MICRO, DATA } from './data';

const should = chai.should();
const micro = MICRO();
const plugin = Plugin({})(micro, 'test', Date.now());
const KEY = 'test-key';

before(() => micro.before.done(...micro.before.args));

after(() => micro.after.done(...micro.after.args));

describe('save / load', function() {
  
  it('#plugin.load -> должен вернуть null', () =>
    plugin
      .read(KEY)
      .then(result => should.equal(null, result))
  );
  
  it('#plugin.save + plugin.load -> должен вернуть объект', () =>
    plugin
      .write(KEY, DATA)
      .then(() => plugin.read(KEY))
      .then(result => result.should.be.a('object'))
      .then(() => plugin.del(KEY))
  );
  
  
  it('#plugin.read + callback -> должен вернуть объект', () => {
    return plugin
      .read(KEY, key => DATA)
      .then(result => should.equal(DATA, result))
      .then(() => plugin.del(KEY));
  });
  
  it('#plugin.read + callback():Promise -> должен вернуть объект', () => {
    return plugin
      .read(KEY, key => Promise.resolve(DATA))
      .then(result => should.equal(DATA, result))
      .then(() => plugin.del(KEY));
  });
});