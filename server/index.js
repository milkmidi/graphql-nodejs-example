const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const graphqlRouter = require('./graphql');

const isProd:boolean = process.env.NODE_ENV === 'production';

const app = express();
// app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));
app.use(bodyParser.json());
app.use('/graphql', graphqlRouter);

if (!isProd) {
  const pattern = /.(png|jpe?g|gif|svg|css|js|ico|txt|map|json)$|__webpack_hmr/;
  app.use(morgan('short', {
    skip: req => pattern.test(req.originalUrl),
  }));
}

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
