const express = require('express');
const helmet = require('helmet');

const server = express();

const projectRouter = require('../projects-router.js');
const actionRouter = require('../actions-router.js');


server.use(helmet());
server.use(express.json());


server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


module.exports = server;