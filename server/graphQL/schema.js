const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const mocks = require('./mocks');

const logger = { log: e => console.log(`aaaaaaaaaaaaaaa:${e}`) };
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});

addMockFunctionsToSchema({ schema, mocks });
module.exports = schema;
