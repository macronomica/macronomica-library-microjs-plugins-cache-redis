import chai from 'chai';
import middleware from 'redis';
import get from './../get-key';
import del from './../del-key';
import set from './../set-key';

const should = chai.should();
const micro = {
  logger: { error: err => console.error(err) }
};
const client = middleware.createClient();

const delWrapper = del(micro, client);
const getWrapper = get(micro, client);
const setWrapper = set(micro, client);

describe('api', function() {
  
  describe('#get', function() {
    it('должен вернуть null', done => {
      
      getWrapper('test-get')
        .then(result => {
          should.equal(null, result);
          done();
        }, done);
    });
    
    it('должен вернуть объект переданный из callback', done => {
      const data = { id: 1 };
      
      getWrapper('test-run-cb', key => data)
        .then(result => {
          should.equal(data, result);
          delWrapper('test-run-cb').then(() => done(), done);
        }, done);
    });
    
    it('должен вернуть объект переданный из callback():Promise', done => {
      const data = { id: 1 };
      
      getWrapper('test-run-cb', key => Promise.resolve(data))
        .then(result => {
          should.equal(data, result);
          delWrapper('test-run-cb').then(() => done(), done);
        }, done);
    });
  });
  
  after(() => client.quit());
});

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