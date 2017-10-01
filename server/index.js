const express = require('express');
const session = require('express-session');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const typeDefs = require('./graphQL/schema');
const resolvers = require('./graphQL/resolvers');
const mocks = require('./graphQL/mocks');

function loggingMiddleware(req, res, next) {
  req.user = { name: 'milkmidi' };
  next();
}
const logger = { log: e => console.log(`aaaaaaaaaaaaaaa:${e}`) };
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});
addMockFunctionsToSchema({ schema, mocks });

const app = express();
// app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));
app.use(bodyParser.json());
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', loggingMiddleware, graphqlExpress(req => ({
  schema,
  context: {
    user: req.user,
  },
})));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
