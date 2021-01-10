require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
	userController,
	hackatonController
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


app.get('/hackatones', validateAuth, hackatonController.getHackaton);
app.post('/hackaton/create', hackatonController.createHackaton);
app.post('/hackaton/:hackatonId/update', hackatonController.updateHackaton);



app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));