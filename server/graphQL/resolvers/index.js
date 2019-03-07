import { authors, posts, users } from '../mockData';

const { find, filter } = require('lodash');
const GraphQLJSON = require('graphql-type-json');
const { GraphQLScalarType, Kind } = require('graphql');
const jwt = require('jsonwebtoken');

const SECRET = 'just_a_random_secret';

const DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    console.log(ast);
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

const createToken = ({ email, name }) => jwt.sign({ email, name }, SECRET, {
  expiresIn: '1d',
});

const resolvers = {
  Query: {
    hello(parent, args, context) {
      console.log('parent', parent);
      console.log('args', args);
      console.log('context', context);
      return 'world';
    },
    posts: (root, args) => {
      console.log(args);
      return posts;
    },
    users: () => users,
    authors: () => authors,
    author: (parent, { id }) => find(authors, { id }),
    foo() {
      const aField = { obj: 123456, hi: 'milkmidi' };
      return { aField };
    },
    myType: () => ({ created: new Date() }),
  },
  Mutation: {
    /*
    mutation{
      upvotePost(postId:2) {
        id
      }
    }
     */
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
    /*
    1 basic
    mutation {
      createPost(input:{
        title:"test",
        authorId:2
      }){
        title
      }
    }
    2 with variables
    mutation createPost($input: PostInput) {
      createPost(input: $input) {
        title
      }
    }
     */
    createPost(parent, args) {
      const { input } = args;
      console.log(input);
      const newPost = {
        id: +new Date(),
        title: input.title,
        authorId: input.authorId,
        votes: 2,
        status: 0,
      };
      posts.push(newPost);
      return posts[posts.length - 1];
    },
    signUp(parent, { name, email, password }) {
      const isUserEmailDuplicate = users.some(user => user.email === email);
      if (isUserEmailDuplicate) throw new Error('User Email Duplicate');

      const newData = {
        name,
        email,
        password,
      };
      users.push(newData);
      return newData;
    },
    login(parent, { email }) {
      const user = users.find(u => u.email === email);

      return { token: createToken(user) };
    },
  },
  Author: {
    posts(parent) {
      console.log('Author posts', parent);
      return filter(posts, { authorId: parent.id });
    },
  },
  Post: {
    author(parent) {
      console.log('Post author', parent);
      return find(authors, { id: parent.authorId });
    },
  },
  JSON: GraphQLJSON,
  Date: DateScalarType,
  // PostEnum: PostEnumType,
  PostEnum: {
    REMOVE: 0,
    READY: 1,
    DRAFT: 2,
  },
};
module.exports = resolvers;
