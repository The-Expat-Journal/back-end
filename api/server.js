const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/restricted-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const storiesRouter = require('../stories/stories-router.js');
const photosRouter = require('../photos/photos-router.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/stories', authenticate, storiesRouter);
server.use('/api/photos', authenticate, photosRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: "Up and running!"})
});

module.exports = server;
