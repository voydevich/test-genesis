const path = require('path');

const get = require('lodash/get');

const botPath = (bot = {}) => {
    return path.join(get(bot, 'path', ''), get(bot, 'name', ''))
};

module.exports = botPath;