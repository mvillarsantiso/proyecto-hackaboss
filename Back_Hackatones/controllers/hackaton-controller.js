'use strict';

const Joi = require('joi');
const { hackatonRepository } = require('../repositories');


async function getHackaton(req, res) {
  try {
      const hackaton = await hackatonRepository.getHackaton();
      res.send(hackaton);  
  } catch (err) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function getHackatonById(req, res) {
  const id = req.params.hackatonId;
  try{
    const hackatonId = await hackatonRepository.getHackatonById(id);
    res.send(hackatonId)

  }catch(err){
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message });
  }
}

async function createHackaton(req, res){
    if(req.auth.role !== "ADMIN") {
      res.status(403);
      return res.json({err: "Insufficient privileges"})
    }

    try{

        const schema = Joi.object({
            nombre: Joi.string().alphanum().min(5).max(50).required(),
            presencial : Joi.boolean(),
            ciudad: Joi.string(),
            contenido: Joi.string().max(800).required(),
            id_tech: Joi.number().integer().required(),
            inicio: Joi.date().greater('now').required(),
            fin: Joi.date().max('12-31-2022').required(),
            max_register: Joi.number().integer().required()
        });

        await schema.validateAsync(req.body);
      
        const idCreado = await hackatonRepository.createHackaton(req.body.nombre, req.body.presencial, req.body.ciudad,
            req.body.contenido, req.body.id_tech, req.body.inicio, req.body.fin, req.body.max_register);
  
        const hackaton = await hackatonRepository.getHackatonById(idCreado);
  
        return res.send(hackaton);
    }catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        res.status(err.status || 500);
        res.json({ err: err.message });
    }
}

async function updateHackaton(req, res) {
    if(req.auth.role !== "ADMIN") {
      res.status(403);
      return res.json({err: "Insufficient privileges"});
    }

    try {
      
      const { hackatonId } = req.params;
      const { nombre, presencial, ciudad, contenido, id_tech, inicio, fin, max_register } = req.body;

      const schema = Joi.object({
        hackatonId: Joi.number().positive().required(),
        nombre: Joi.string().alphanum().min(5).max(50).required(),
        presencial : Joi.boolean(),
        ciudad: Joi.string(),
        contenido: Joi.string().max(800).required(),
        id_tech: Joi.number().integer(),
        inicio: Joi.date().greater('now').required(),
        fin: Joi.date().max('12-31-2022').required(),
        max_register: Joi.number().integer().required()
      });
  
      await schema.validateAsync({ hackatonId, nombre, presencial, ciudad, contenido, id_tech, inicio, fin, max_register});
  
      const hackaton = await hackatonRepository.getHackatonById(hackatonId);
  
      if (!hackaton) {
        res.status(404);
        return res.json({ err: 'Hackaton no encontrado.' });
      }
  
      await hackatonRepository.updateHackaton(nombre, presencial, ciudad, contenido, id_tech, inicio, fin, max_register, hackaton.id);
      const hackatonUpdated = await hackatonRepository.getHackatonById(hackaton.id);
  
      res.send(hackatonUpdated);
    } catch (err) {
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.json({ err: err.message });
    }
}

async function registerToHackaton(req, res) {
  try{
    const { userId, hackatonId } = req.params;
    const codigoReserva = Math.floor(Math.random() * Math.floor(1000000));

    await hackatonRepository.registerToHackaton(userId, hackatonId, codigoReserva);
    
    res.send({ 
      codigoReserva: codigoReserva,
      mensaje: 'Te has subscrito con éxito!'
    });

  }catch(err){
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: 'Ya estás registrado a este hackathon.'})
  }
}

async function unsubscribeToHackaton(req, res) {
  try{
    const { userId, hackatonId } = req.params;
    const code = await hackatonRepository.getCodeFromRegistration(userId, hackatonId);

    await hackatonRepository.unsubscribeToHackaton(code);

    res.send({ message: 'Te has desapuntado del hackaton'})
  }catch(err){
    console.log(err);
    res.status(err.status || 500);
    res.json({ err: err.message})
  }
}

module.exports = {
    getHackaton,
    getHackatonById,
    createHackaton,
    updateHackaton,
    registerToHackaton,
    unsubscribeToHackaton
};