import chai from 'chai';
import Plugin from '../../index';
import { MICRO } from './data';

const should = chai.should();
chai.config.showDiff = true;

const micro = MICRO();
const plugin = Plugin({})(micro, 'test', Date.now());

before(() => micro.before
  .done(...micro.before.args)
  .then(() => plugin.del(plugin.TAGS_KEY))
);

after(() => plugin
  .del(plugin.TAGS_KEY)
  .then(() => micro.after.done(...micro.after.args))
);

describe('tags-get', function() {
  
  it('get all should null', () => plugin.tagget()
    .then(tags => should.equal(tags, null))
  );
  
  it('get one should null', () => plugin.tagget('user-1')
    .then(tags => tags.should.to.contain.all.keys({ 'user-1': null }))
  );
  
  it('get many should null', () => plugin.tagget('user-1', 'user-2', 'user-3')
    .then(tags => tags.should.to.contain.all.keys({ 'user-1': null, 'user-2': null, 'user-3': null }))
  );
  
  it('should have property', () => plugin
    .tagset('user-1', 'user-2')
    .then(tags => plugin.tagget('user-1', 'user-2'))
    .then(tags => tags.should.to.contain.all.keys([ 'user-1', 'user-2' ]))
  );
  it('should have property', () => plugin
    .tagset('user-1')
    .then(tags => plugin.tagget('user-1'))
    .then(tags => tags.should.have.property('user-1'))
  );

});