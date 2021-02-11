'use strict';

require('dotenv').config();

const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const express = require('express');


const app = express();

const {
	LOGFILE,
	NODE_ENV
} = process.env;

const logFilePath = path.join(__dirname, LOGFILE);


if (NODE_ENV === 'development'){
	app.use(morgan('combined', {
		stream: fs.createWriteStream(logFilePath, { flags : 'a'})
    }));
}
