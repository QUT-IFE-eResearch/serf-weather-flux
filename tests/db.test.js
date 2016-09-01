'use strict';

const assert = require('assert');
const db = require('../app/db');

describe('Get Max from DB', function () {
    it('get Max', function (done) {
        db
            .getMax('CR3000_slow_met', 'Ta_HMP_01_Avg', 'TIMESTAMP', '2013-10-28')
            .then((res)=>{
                assert.equal(res.max, '26.0344');
                done();
            })
            .catch((err)=>{
                console.log(err);
                assert.fail(err);
                done();
            })
        });
});

describe('Get SUM from DB', function () {
    it('get Sum', function (done) {
        db
            .getSum('CR3000_slow_met', 'Rain_Tot', 'TIMESTAMP', '2013-10-28')
            .then((res)=>{
                assert.equal(res.sum, '0');
                done();
            })
            .catch((err)=>{
                console.log(err);
                assert.fail(err);
                done();
            })
    });
});
