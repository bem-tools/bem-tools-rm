'use strict';
var fs = require('fs'),
    path = require('path'),
    find = require('bem-tools-find'),
    stream = require('through2');

module.exports = function(conditions) {
    return find(conditions).pipe(remove());
};

function remove() {
    var folders = [];
    return stream.obj(function(item, enc, cb) {
        var filePath = item.path;
        folders.push(path.dirname(filePath));
        this.push(filePath);
        fs.unlink(filePath, cb);
    }, function(cb) {
        folders.forEach(function(folder) {
            fs.readdirSync(folder).length == 0 && fs.rmdirSync(folder);
        });
        cb();
    });
}
