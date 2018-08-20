const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');

const graphqlRouter = require('./graphql');


const app = express();
// app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));
app.use(bodyParser.json());
app.use('/graphql', graphqlRouter);


app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
