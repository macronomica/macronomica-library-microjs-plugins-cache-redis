import chai from 'chai';
import Plugin from '../index';
import { MICRO, DATA } from './data';

const should = chai.should();
chai.config.showDiff = true;

const micro = MICRO();
const plugin = Plugin({})(micro, 'test', Date.now());

let result;

before(() => micro.before
  .done(...micro.before.args)
  .then(() => console.log(plugin.TAGS_KEY))
  .then(() => plugin.del(plugin.TAGS_KEY))
);

after(() => plugin
  .del(plugin.TAGS_KEY)
  .then(() => micro.after.done(...micro.after.args))
);

describe('tags', function() {

  describe('#tag new', function() {
    it('should have property', () => plugin
      .tagset('user-1', 'user-2')
      .then(tags => {

      })
    );
  });

});