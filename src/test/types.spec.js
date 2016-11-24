import chai from 'chai';
import Plugin from '../index';
import { MICRO, DATA } from './data';

const should = chai.should();
chai.config.showDiff = true;

const micro = MICRO();
const plugin = Plugin({})(micro, 'test', Date.now());
const KEY = 'test-types-key';
let result;

before(() => micro.before
  .done(...micro.before.args)
  .then(() => plugin.write(KEY, DATA))
  .then(() => plugin.read(KEY))
  .then(raw => result = raw)
);

after(() => plugin
  .del(KEY)
  .then(() => micro.after.done(...micro.after.args))
);

describe('types', function() {

  describe('#null', function() {
    it('should have property', () => result.should.have.property('null'));
    it('should equal null', () => should.equal(result.null, DATA.null));
  });

  describe('#undefined', function() {
    it('should have not property', () => result.should.have.not.property('undefined'));
  });

  describe('#number', function() {
    it('should be a number', () => result.number.should.be.a('number'));
    it('should equal number', () => result.number.should.equal(DATA.number));
  });

  describe('#string', function() {
    it('should be a string', () => result.string.should.be.a('string'));
    it('should equal string', () => result.string.should.equal(DATA.string));
  });

  describe('#boolean', function() {
    it('should be a boolean', () => result.boolean.should.be.a('boolean'));
    it('should equal boolean', () => result.boolean.should.equal(DATA.boolean));
  });

  describe('#date', function() {
    it('should be a date', () => result.date.should.be.a('date'));
    it('should equal date', () => result.date.toString().should.equal(DATA.date.toString()));
  });

  describe('#boolean[]', function() {
    it('should have property', () => result.should.have.property('barray'));
    it('should with length', () => result.barray.should.with.length(DATA.barray.length));

    it('items should be boolean', () => result.barray.forEach((row, i) => row.should.be.a('boolean')));
    it('items should equal', () => result.barray.forEach((row, i) => row.should.equal(DATA.barray[ i ])));
  });

  describe('#number[]', function() {
    it('should have property', () => result.should.have.property('narray'));
    it('should with length', () => result.narray.should.with.length(DATA.narray.length));

    it('items should be number', () => result.narray.forEach((row, i) => row.should.be.a('number')));
    it('items should equal', () => result.narray.forEach((row, i) => row.should.equal(DATA.narray[ i ])));
  });

  describe('#string[]', function() {
    it('should have property', () => result.should.have.property('sarray'));
    it('should with length', () => result.sarray.should.with.length(DATA.sarray.length));
    it('items should be string', () => result.sarray.forEach((row, i) => row.should.be.a('string')));
    it('items should equal', () => result.sarray.forEach((row, i) => row.should.equal(DATA.sarray[ i ])));
    it('items should with length', () => result.sarray.forEach((row, i) => row.should.with.length(DATA.sarray[ i ].length)));
  });

});