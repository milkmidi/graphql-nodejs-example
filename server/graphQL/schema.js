const {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');
const mockData = require('./mockData');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, { id }) {
        // console.log(req.session);
        console.log(parentValue, id);
        return mockData[id];
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return mockData.users;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      descriptions: 'add Project',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { name }) {
        // console.log(req.session);
        console.log(parentValue, name);
        return mockData.a;
      },

    },
  },
});

module.exports = new GraphQLSchema({ query, mutation });
