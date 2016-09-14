'use strict';

const assert = require('assert');
const db = require('../app/db');

describe('Get Min from DB', function () {
    it('get Min', function (done) {
        db
        .getMin('CR3000_slow_met', 'Ta_HMP_01_Avg', 'TIMESTAMP', '2016-09-01')
        .then((res)=> {
            assert.equal(res.min, '8.946233');
            done();
        })
        .catch((err)=> {
            console.log(err);
            assert.fail(err);
            done();
        });
    });
});

describe('Get Max from DB', function () {
    it('get Max', function (done) {
        db
        .getMax('CR3000_slow_met', 'Ta_HMP_01_Avg', 'TIMESTAMP',  '2016-09-01')
        .then((res)=>{
            assert.equal(res.max, '25.8583');
            done();
        })
        .catch((err)=>{
            console.log(err);
            assert.fail(err);
            done();
        });
    });
});

describe('Get SUM from DB', function () {
    it('get Sum', function (done) {
        db
            .getSum('CR3000_slow_met', 'TIMESTAMP', 'Rain_Tot', '2013-10-28')
            .then((res)=>{
                assert.equal(res.sum, 0);
                done();
            })
            .catch((err)=>{
                console.log(err);
                assert.fail(err);
                done();
            });
    });
});
