require ('dotenv/config');

const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require('cors')

const Router = require ('./src/Routes/index');
const server = express();
const port = process.env.PORT || 3030;
const nodeEnv = 'Development';

server.listen(port, () => {
  console.log(`Server is running in port ${port} in ${nodeEnv} Mode`);
});

server.use(cors())
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/', Router);

module.exports = server;
