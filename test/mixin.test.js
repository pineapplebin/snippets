'use strict';

const mixin = require('../src/mixin');
const should = require('should/as-function');

describe('mixin', () => {
    const man = new mixin.Person();
    it('should instance of BookCollector', () => {
        should(man).be.a.instanceOf(mixin.BookCollector)
    })
});
