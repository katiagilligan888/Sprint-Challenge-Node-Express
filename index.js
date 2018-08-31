const express = require('express'); 
const ProjectRouter = require('./Routes/ProjectRoutes.js'); 
const ActionRouter = require('./Routes/ActionRoutes.js'); 
const server = express(); 

server.use('/api/projects', ProjectRouter);
server.use('/api/actions', ActionRouter); 

server.use(express.json());



server.listen(9000); 