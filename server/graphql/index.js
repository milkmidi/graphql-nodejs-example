const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const schemaString = require('./schemas');
const resolvers = require('./resolvers');

const logger = { log: e => console.log(`aaaaaaaaaaaaaaa:${e}`) };
const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
  logger,
});


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
