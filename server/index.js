const express = require('express');
const graphqlHTTP = require('express-graphql');
const session = require('express-session');

const schema = require('./graphQL/schema');


function loggingMiddleware(req, res, next) {
  res.locals.user = { name: 'milkmidi' };
  next();
}

const app = express();
app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));

const someFunctionToGetRootValue = (req, res, graphQLParams) =>
  new Promise((resolve) => {
    // console.log(graphQLParams);
    setTimeout(() => {
      resolve(res.locals.user);
    }, 300);
  })
;

app.use('/graphql', loggingMiddleware, graphqlHTTP(async (req, res, graphQLParams) => {
  const startTime = Date.now();
  return {
    schema,
    rootValue: await someFunctionToGetRootValue(req, res, graphQLParams),
    graphiql: true,
    pretty: true,
    extensions({ document, variables, operationName, result }) { // eslint-disable-line
      return { runTime: Date.now() - startTime };
    },
  };
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
