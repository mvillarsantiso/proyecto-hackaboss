const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');

const app = express();


app.use(expressValidator({

    customValidators: {
        isImage: function(value, filename) {
    
            let extension = (path.extname(filename)).toLowerCase();

            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case  '.png':
                    return '.png';
                default:
                    return false;
            }
        }
    }
}));