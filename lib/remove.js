'use strict';
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    fsExtra = require('fs-extra'),
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
        fsExtra.remove(filePath, cb);
    }, function(cb) {
        _.uniq(folders)
            .forEach(function(folder) {
                fs.readdirSync(folder).length == 0 && fsExtra.removeSync(folder);
            });
        cb();
    });
}
