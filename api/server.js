const express = require("express");
const AcctRouter = require('./accounts/accounts-router');
const server = express();

server.use(express.json());
server.use('/api/accounts', AcctRouter);
module.exports = server;
