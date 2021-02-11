'use strict';

const userRepository = require('./user-repository');
const hackatonRepository = require('./hackaton-repository');
const newsRepository = require('./news-repository');
const techRepository = require('./tech-repository');

module.exports = {
    userRepository,
	hackatonRepository,
	newsRepository,
	techRepository
};