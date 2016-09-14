'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'), 
    jscs = require('gulp-jscs');

var config = require('./gulp.config')();

gulp.task('lint', function () {
    return gulp
        .src(config.alljs)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('serve-dev', function () {
    const nodemon = require('gulp-nodemon');
    nodemon({
        script: config.start,
        ext: 'js',
        delay: 1000,
        ignore: config.ignoreFiles
    })
    .on('restart', function (files) {
        console.log('Change detected:', files);
    });
});

gulp.task('watch', function () {
    gulp.watch(config.alljs, ['lint']);
});

gulp.task('default', ['watch']);