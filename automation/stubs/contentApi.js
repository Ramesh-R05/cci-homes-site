'use strict';

var cloneDeep = require('lodash/lang/cloneDeep');

var start = function(port) {
    var express = require('express');
    var server = express();

    server.get('/section/article-01-creative-home', function(req, res) {
        var article = require(process.cwd() + '/automation/test_data/article');
        res.json(article);
    });

    server.listen(port);
    console.info('listening on port ' + port);
};

module.exports = {
    start: start
};