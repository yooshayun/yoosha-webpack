'use strict'

exports.env = function() {
    return {
        NODE_ENV: '"'+ process.env.npm_package_config_WEBENV + '"' || "'production'"
    }
};