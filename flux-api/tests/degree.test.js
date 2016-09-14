'use strict';

const assert = require('assert');
const cardinal = require('../app/utils/cardinal');

describe('Get Cardinal from degree', function () {
    it('get N', function (done) {
        var deg = cardinal(348.75);
        assert.equal(deg, 'N');
        done();
    });
    it('get NNE', function (done) {
        var deg = cardinal(11.25);
        assert.equal(deg, 'NNE');
        done();
    });
    it('get NE', function (done) {
        var deg = cardinal(33.75);
        assert.equal(deg, 'NE');
        done();
    });
    it('get ENE', function (done) {
        var deg = cardinal(56.25);
        assert.equal(deg, 'ENE');
        done();
    });
    it('get NNW', function (done) {
        var deg = cardinal(348.74);
        assert.equal(deg, 'NNW');
        done();
    });
});