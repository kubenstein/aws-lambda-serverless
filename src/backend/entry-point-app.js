const { handle } = require('hono/aws-lambda');
const app = require('./app.js');

exports.handler = handle(app);
