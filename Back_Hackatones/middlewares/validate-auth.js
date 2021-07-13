'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth (req, res, next){
  try{
    console.log(req)
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    const { id, name, role } = decodedToken;
    
    req.auth = { id, name, role};
    next();
  }catch(error) {
    console.log(error);
    res.status(401);
    res.json({error: 'Tienes que estar loggeado'});
  }
}

module.exports = validateAuth;