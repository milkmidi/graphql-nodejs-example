const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

function loggingMiddleware(req, res, next) {
  req.user = { name: 'milkmidi' };
  next();
}

const router = express.Router();
router.use('/', loggingMiddleware, graphqlHTTP(req => ({
  schema,
  graphiql: true,
  pretty: true,
  context: {
    user: req.user,
  },
})));
module.exports = router;
