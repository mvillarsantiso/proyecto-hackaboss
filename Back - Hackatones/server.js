require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
	userController,
	hackatonController,
	newsController
} = require('./controllers');

const validateAuth = require('./middlewares/validate-auth');
  

const {
	SERVER_PORT,
} = process.env;

app.use(bodyParser.json());

app.get('/user-info/:userId', validateAuth, userController.getUserInfo);
app.get('/users', validateAuth, userController.getUsers);
app.post('/users/login', userController.login);
app.post('/users/register', userController.register);
app.post('/user/:userId/update', validateAuth, userController.updateUser);


app.get('/hackatones', hackatonController.getHackaton);
app.get('/hackaton/:hackatonId', hackatonController.getHackatonById);
app.post('/hackaton/:userId/create', validateAuth, hackatonController.createHackaton);
app.post('/hackaton/:hackatonId/update', validateAuth, hackatonController.updateHackaton);
app.post('/hackaton/:hackatonId/:userId/register', validateAuth, hackatonController.registerToHackaton);

app.get('/noticias', newsController.getNews);
app.get('/noticias/:noticiaId', newsController.getNewsById);
app.post('/noticias/create', validateAuth, newsController.createNew);

// avatar ??

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));