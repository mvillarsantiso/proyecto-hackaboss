'use strict';

const { techRepository } = require("../repositories");

async function getTech(req, res) {
    try {
      const tech = await techRepository.getTech();
  
      res.send(tech);
    } catch (err) {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ error: err.message });
    }
}

module.exports = {
    getTech
}