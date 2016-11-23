import chai from 'chai';
import Plugin from '../index';

const should = chai.should();
const micro = {
  before: { done: () => {}, args: [] },
  after : { done: () => {}, args: [] },
  queue : (raw) => {
    
    switch (raw.case) {
      case 'wait' : micro.before = raw; break;
      case 'close': micro.after = raw; break;
    }
    
    return micro;
  },
  logger: {
    error: err => console.error(err)
  }
};

const plugin = Plugin({})(micro, 'test', Date.now());
const KEY = 'test-key';

before(() => micro.before.done(...micro.before.args));

after(() => micro.after.done(...micro.after.args));

describe('read / write', function() {
  
  it('#plugin.read -> должен вернуть null', () =>
    plugin
      .read(KEY)
      .then(result => should.equal(null, result))
  );
  
  it('#plugin.write + plugin.read -> должен вернуть объект', () =>
    plugin
      .write(KEY, { id: 1 })
      .then(() => plugin.read(KEY))
      .then(result => {
        result.should.be.a('object');
        should.equal(1, result.id);
      })
      .then(() => plugin.del(KEY))
  );
  
  
  it('#plugin.read + callback -> должен вернуть объект', () => {
    const data = { id: 1 };
    
    return plugin
      .read(KEY, key => data)
      .then(result => should.equal(data, result))
      .then(() => plugin.del(KEY));
  });
  
  it('#plugin.read + callback():Promise -> должен вернуть объект', () => {
    const data = { id: 1 };
    
    return plugin
      .read(KEY, key => Promise.resolve(data))
      .then(result => should.equal(data, result))
      .then(() => plugin.del(KEY));
  });
});