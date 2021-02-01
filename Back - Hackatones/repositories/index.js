'use strict';

const userRepository = require('./user-repository');
const hackatonRepository = require('./hackaton-repository');
const newsRepository = require('./news-repository')

module.exports = {
    userRepository,
	hackatonRepository,
	newsRepository
};