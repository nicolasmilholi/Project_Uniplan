const express = require('express');

const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const LeadsController = require('./controllers/LeadsController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/leads', LeadsController.index);
routes.post('/leads', LeadsController.create);
routes.delete('/leads/:id', LeadsController.delete);

module.exports = routes;
