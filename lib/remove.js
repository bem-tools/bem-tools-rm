'use strict';

const getEntityData = require('./get-entity-data');
const getPath = require('./get-path');
const removeEntity = require('./remove-entity');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);

module.exports = function remove(entities, levels, techs, options) {
    const entities = getEntityData(entities, levels, techs, options);

    return Promise.all(entities.map(item =>
        removePath(getPath(item))
    ))
    .then(pathes => pathes.map(path.dirname))
    .then(_.uniq)
    .then(folders => Promise.all(folders.map(folder =>
        readdir(folder)
            .then(files => {
                if (files.length === 0) {
                    return rmdir(folder);
                }
            })
    )));
};
