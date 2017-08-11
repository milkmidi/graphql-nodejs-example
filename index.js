var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

// Define the User type
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (root, {id},req,res) {
        console.log(root,id);
        // console.log(res);
        return fakeDatabase[id];
      }
    }
  }
});

var schema = new graphql.GraphQLSchema({query: queryType});



function loggingMiddleware(req, res, next) {
  // console.log('ip:', req.ip);
  console.log('loggingMiddleware');
  res.locals.user = {name:'milkmidi'}
  next();
}

var app = express();
app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 }}));

const someFunctionToGetRootValue = (req,res,graphQLParams) => {
  console.log(res.locals.user);
  // console.log(graphQLParams);
  return new Promise((resolve,reject)=>{
    // setTimeout(resolve(res.locals.user),1000);
    setTimeout(() => {
      reject('auth error')
    },1000);
  })
}

app.use('/graphql',loggingMiddleware, graphqlHTTP(async (req, res, graphQLParams) => ({
  schema: schema,
  rootValue: await someFunctionToGetRootValue(req,res,graphQLParams),
  graphiql: true
})));

/* app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue:root,
  graphiql: true,
})); */
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');