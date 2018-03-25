'use strict';

var remove = require('./');

function noOp() { }

module.exports = function () {
    this
        .title('Remove BEM entity').helpful()
        .opt()
        .name('level').short('l').long('level')
        .title('level directory path')
        .end()
        .opt()
        .name('block').short('b').long('block')
        .title('block name, required')
        .arr()
        .end()
        .opt()
        .name('elem').short('e').long('elem')
        .title('element name')
        .arr()
        .end()
        .opt()
        .name('mod').short('m').long('mod')
        .title('modifier name')
        .arr()
        .end()
        .opt()
        .name('val').short('v').long('val')
        .title('modifier value')
        .arr()
        .end()
        .opt()
        .name('tech').short('t').long('remove-tech')
        .title('remove tech')
        .arr()
        .end()
        .opt()
        .name('leaveTech').short('lt').long('leave-tech')
        .title('leave tech')
        .arr()
        .end()
        .opt()
        .name('entities').title('Entities')
        .arr()
        .end()
        .act(function (opts, args) {
            var options = {},
                techs = opts.tech || [];

            if (opts.leaveTech) {
                // we intending better to leave tech then to delete
                techs = techs.filter(tech => !opts.leaveTech.includes(tech));
            }

            if (args.entities) {
                return remove(args.entities, opts.level, techs, options).then(noOp); // wtf is entities
            }

            opts.block && remove([{
                block: opts.block[0],
                elem: opts.elem && opts.elem[0],
                modName: opts.mod && opts.mod[0],
                modVal: opts.val ? opts.val[0] : Boolean(opts.mod)
            }], opts.level, techs, options).then(noOp);
        })
        .end();
};
