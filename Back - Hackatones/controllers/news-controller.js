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
    try{
        const noticiaId = await newsRepository.getNewsById();
        res.send(noticiaId);

    }catch(err){
        console.log(err);
        res.status(err.status || 500);
        res.json({ err: err.message});
    }
}

async function createNew(req, res){
    try{
        const schema = Joi.object({
            titular: Joi.string().alphanum().min(5).max(50).required(),
            contenido: Joi.string().max(5000).required(),
            f_publicacion: Joi.date().greater('now').max('12-31-2022').required()
        });

        await schema.validateAsync(req.body);

        const idCreado = await newsRepository.createNew(req.body.titular, req.body.contenido, req.body.f_publicacion);

        const noticia = await newsRepository.createNewç(idCreado)

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