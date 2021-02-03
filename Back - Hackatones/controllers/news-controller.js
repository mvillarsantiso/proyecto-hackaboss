'use strict';

const Joi = require('joi');
const { newsRepository} = require('../repositories');

async function getNews(req, res) {
    try{
        const noticia = await newsRepository.getNews();
        res.send(noticia);

    }catch(err){
        console.log(err);
        res.status(err.status || 500);
        res.json({ err: err.message });
    }
}

async function getNewsById(req, res) {
    const id = req.params.noticiaId;
    try{
        const noticiaId = await newsRepository.getNewsById(id);
        res.send(noticiaId);

    }catch(err){
        console.log(err);
        res.status(err.status || 500);
        res.json({ err: err.message});
    }
}

async function createNew(req, res){
    
    if(req.auth.role !== "ADMIN") {
        res.status(403);
        return res.json({err: "Insufficient privileges"})
    }

    try{
        const schema = Joi.object({
            titular: Joi.string().alphanum().min(5).max(50).required(),
            contenido: Joi.string().max(5000).required(),
        });

        await schema.validateAsync(req.body);

        //const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const now  = new Date();

        const idCreado = await newsRepository.createNew(req.body.titular, req.body.contenido, now);

        const noticia = await newsRepository.getNewsById(idCreado)

        res.send(noticia);

    }catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            err.status = 400
        }
        res.status(err.status || 500)
        res.json({err: err.message})
    }
}

module.exports = {
    getNews,
    getNewsById,
    createNew
}