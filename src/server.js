'use strict';
const helpers = require('handlebars-helpers')();
var server = require('express')();

require('./config/security')(server);
require('./config/handlebars')(server);
require('./config/bodyparser')(server);
require('./routes/routes')(server);

var http = require('http');
var os = require('os');
var hostname = os.hostname();

var qs = require('qs');
var moment = require('moment');

var port = process.env.PORT || 3000;

function handleRequest (request, response) {
  response.end('[' + hostname + '] Serving requests from myapp SubServe microservices-node-todo-frontend:v0.1.36. Request URL:' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('Server listening on port', port);
});
