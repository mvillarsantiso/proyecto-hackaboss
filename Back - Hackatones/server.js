require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

const {
	userController,
	hackatonController,
	newsController,
	techController
} = require('./controllers');

const validateAuth = require('./middlewares/validate-auth');
  

const {
	SERVER_PORT,
} = process.env;

app.use(bodyParser.json());
app.use(fileUpload());

app.get('/users-info/:userId', validateAuth, userController.getUserInfo);
app.get('/users', validateAuth, userController.getUsers);
app.post('/users/login', userController.login);
app.post('/users/register', userController.register);
app.post('/users/:userId/update', validateAuth, userController.updateUser);
app.put('/users/:userId/password', validateAuth, userController.updateUserPass);


app.get('/hackatones', hackatonController.getHackaton);
app.get('/hackatones/:hackatonId', hackatonController.getHackatonById);
app.post('/hackatones/create', validateAuth, hackatonController.createHackaton);
app.post('/hackatones/:hackatonId/update', validateAuth, hackatonController.updateHackaton);
app.post('/hackatones/:hackatonId/:userId/register', validateAuth, hackatonController.registerToHackaton);

app.get('/noticias', newsController.getNews);
app.get('/noticias/:noticiaId', newsController.getNewsById);
app.post('/noticias/create', validateAuth, newsController.createNew);

app.get('/tecnologias', techController.getTech);

// id usuario por body en el registro a hackaton ??
// desapuntarse hackaton
// endpoint updateavatar

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));