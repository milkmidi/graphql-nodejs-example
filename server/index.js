const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


// const graphqlRouter = require('./graphql');
const apolloServer = require('./graphQL/apolloServer');


const isProd:boolean = process.env.NODE_ENV === 'production';

const app = express();
// app.use(session({ secret: 'hi, I\'m milkmidi', cookie: { maxAge: 60000 } }));
app.use(bodyParser.json());
// app.use('/graphql', graphqlRouter);
apolloServer.init(app);

if (!isProd) {
  const pattern = /.(png|jpe?g|gif|svg|css|js|ico|txt|map|json)$|__webpack_hmr/;
  app.use(morgan('short', {
    skip: req => pattern.test(req.originalUrl),
  }));
}

app.listen({ port: 4000 }, () => {
  console.log('🚀 Server ready on http://localhost:4000/graphql');
});
