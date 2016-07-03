'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const log = require('./logger')();
const settings = require('../settings.json');
const job = require('./job');
const db = require('./db');

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

app.get('/', (req, res) => {
    res.status(200).json('Hi');
});

app.get('/flux/:table', (req, res) => {
    var row = null;
    db.getLastPoint(req.params.table, 'RECORD')
        .then((lastRow) =>{
            row = lastRow;
            return db.getRowsBetween(req.params.table, 'RECORD', row.RECORD - 100, row.RECORD);
        })
        .then((rows) => {
            res.status(200).send({
                rows: rows,
                first: row.RECORD - 100,
                last: row.RECORD,
                lastInsert: row.RECORD
            });
        })
        .catch((error) => {
            log.error(new Error(error))
        })
});

var server = app.listen(process.env.PORT || settings.port, () => {
    log.info('Api listening on ', server.address().port);
});

job.start();