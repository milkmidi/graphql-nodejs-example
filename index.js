const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const session = require('express-session');

// Maps id to User object
const fakeDatabase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
};

// Define the User type
const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve(parentValue, { id }, req) {
        console.log(req.session);
        console.log(req.user);
        // console.log(parentValue, id);
        // console.log(res);
        return fakeDatabase[id];
      },

    },
  },
});

const schema = new graphql.GraphQLSchema({ query: queryType });


function loggingMiddleware(req, res, next) {
  // console.log('ip:', req.ip);
  // console.log('loggingMiddleware');
  res.locals.user = { name: 'milkmidi' };
  req.user = { name: 'tttttt' };
  next();
}

const app = express();
app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));

const someFunctionToGetRootValue = (req, res) =>
  // console.log(res.locals.user);
  // console.log(graphQLParams);
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.locals.user);
    }, 1000);
  })
;

app.use('/graphql', loggingMiddleware, graphqlHTTP(async (req, res, graphQLParams) => {
  const startTime = Date.now();
  return {
    schema,
    rootValue: await someFunctionToGetRootValue(req, res, graphQLParams),
    graphiql: true,
    pretty: true,
    extensions({ document, variables, operationName, result }) {
      // console.log(result);
      return { runTime: Date.now() - startTime };
    },
  };
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
