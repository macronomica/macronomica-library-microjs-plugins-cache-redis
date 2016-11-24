import chai from 'chai';
import Plugin from '../index';
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

describe('tags-set', function() {
  
  it('should set one tag', () => plugin
    .tagset('user-1')
    .then(tags => tags.should
      .have.property('user-1'))
  );
  
  it('should set many tags', () => plugin
    .tagset('user-1', 'user-2', 'user-3', 'user-4')
    .then(tags => tags.should.be.a('object')
      .have.all.keys('user-1', 'user-2', 'user-3', 'user-4'))
  );

});