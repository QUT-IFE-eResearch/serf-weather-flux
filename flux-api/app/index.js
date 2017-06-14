'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const log = require('./logger')();
const settings = require('../settings.json');
const job = require('./job');
const db = require('./db');
const _ = require('underscore');
const moment = require('moment');

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');//Maybe PUT, DELETE?
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);
app.use('/', express.static(settings.static));

app.get('/', (req, res) => {
});

app.get('/flux/:table/:opts', (req, res) => {
    var opts = req.params.opts.split('.');
    var row = {};
    db.getLastPoint(req.params.table, 'RECORD')
        .then((lastRow) => {
            row = lastRow;
            return db.getRowsBetween(req.params.table, opts, 'RECORD', row.RECORD - 100, row.RECORD);
        })
        .then((rows) => {
            res.status(200).send({
                rows: rows.xyed,
                mnmx: rows.mnmx,
                first: row.RECORD - 100,
                last: row.RECORD,
                lastInsert: row.RECORD
            });
        })
        .catch((error) => {
            res.status(404).send({
                error:error.message
            });
            log.error(new Error(error));
        });
});

app.get('/flux2/:table/:opts', (req, res) => {
    var opts = req.params.opts.split('.');
    var row = {};
    db.getLastPoint(req.params.table, 'RECORD')
        .then((lastRow) => {
            row = lastRow;
            return db.getRowsBetween2(req.params.table, opts, 'RECORD', row.RECORD - 100, row.RECORD);
        })
        .then((rows) => {
            res.status(200).send({
                rows: rows.xyed,
                mnmx: rows.mnmx,
                first: row.RECORD - 100,
                last: row.RECORD,
                lastInsert: row.RECORD
            });
        })
        .catch((error) => {
            res.status(404).send({
                error:error.message
            });
            log.error(new Error(error));
        });
});

app.get('/pragma/:table', function(req, res){
    var table = _.findWhere(settings.tables, {name: req.params.table});
    db.getPragma(table.name)
        .then( (rows) => {
            res.status(200).send({
                rows: rows,
                rowDefs: table.rows
            });
        })
        .catch( (error) => {
            res.status(400).send({rows:{},rowsDefs:{}});
            log.error(new Error(error));
        });
});

app.get('/lastday/:table', function(req, res){
    db.getLastPoint(req.params.table, 'TIMESTAMP')
        .then( (row) => {
            var timestamp = row.TIMESTAMP.trim();
            var current = moment(timestamp).format("YYYY-MM-DD HH:MM:SS");
            var today = moment(new Date());
            var diff = today.diff(current, 'days');
            var result = '';
            if(diff > 1){
                result = 'Last day updated ' + diff + ' days ago on ' + current;
            }else{
                result = 'OK';
            }
            res.status(200).send(result);
        })
        .catch( (err) => {
            console.log(Date() + " " + err);
            res.status(400).send(err);
            log.error(new Error(err));
        });
});

app.get('/summary', function (req, res) {
    var summary = require('./summary');
    summary().then((response)=>{
        res.status(200).send(response);
    }).catch((error)=>{
        res.status(400).send(error.message);
        log.error(new Error(error));
    });
});

var server = app.listen(process.env.PORT || settings.port, () => {
    log.info('Api listening on ', server.address().port);
});


if(settings.startJob) {
    job.start();
}
