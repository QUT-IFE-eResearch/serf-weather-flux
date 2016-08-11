'use strict';

module.exports = function () {
    return  {
        alljs: [
            './app/**/*.js',
            './*.js'
        ],
        ignoreFiles: [
            'node_modules/**/*',
            'test-data/**/*'
        ],
        start: 'app/index.js'
    };
};