import * as schemas from './schemas';

const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');

const SECRET = 'just_a_random_secret';
const typeDefs:string[] = Object.values(schemas).map(s => gql`${s}`);
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token:string = req.headers['x-token'];
    if (token) {
      try {
        // 2. 檢查 token + 取得解析出的資料
        const me = await jwt.verify(token, SECRET);
        // 3. 放進 context
        console.log(me);
        return { me };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
    return {};
  },
});


module.exports = {
  init(app) {
    server.applyMiddleware({ app });
  },
};
