'use strict';

var EOL  = require('os').EOL,
    bemNaming = require('bem-naming'),
    stream = require('through2'),
    util = require('bem-tools-find/lib/util'),
    remove = require('./lib/remove');

/**
 * Executes find process with given cli options and arguments
 * @param {Object} opts - cli options
 * @param {Object} args - cli arguments
 */
function execute(opts, args) {
    var conditions = util.conditionsFromBEMItems(args.entity);
    conditions.push(util.conditionsFromOptions(opts));

    remove(conditions)
        .pipe(report())
        .pipe(process.stdout);
}

/**
 * Returns stream for print all removed files and their total count
 * @returns {Stream}
 */
function report() {
    var count = 0;
    return stream.obj(function(item, enc, cb) {
        this.push('removed: ' + item + EOL);
        count++;
        cb();
    }, function(cb) {
        this.push(count + ' files were removed' + EOL);
        cb();
    });
}

module.exports = function() {
    return this
        .title('BEM Tool Find')
        .helpful()
        .completable()
        .arg()
            .name('entity')
            .title('entity')
            .val(function(value) {
                if (bemNaming.validate(value)) {
                    return bemNaming.parse(value);
                } else {
                    return this.reject('Passed argument is not valid BEM entity');
                }
            })
            .arr()
        .end()
        .opt()
            .name('level')
            .title('Name of level(s)')
            .short('l')
            .long('level')
            .arr()
        .end()
        .opt()
            .name('block')
            .title('Name of block(s)')
            .short('b')
            .long('block')
            .arr()
        .end()
        .opt()
            .name('element')
            .title('Name of element(s)')
            .short('e')
            .long('element')
            .arr()
        .end()
        .opt()
            .name('modifier')
            .title('Name of modifier(s)')
            .short('m')
            .long('mod')
            .arr()
        .end()
        .opt()
            .name('tech')
            .title('Name of tech(s)')
            .short('t')
            .long('tech')
            .arr()
        .end()
        .act(execute);
};
