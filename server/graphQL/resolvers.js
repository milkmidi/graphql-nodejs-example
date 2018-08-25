const { find, filter } = require('lodash');
const GraphQLJSON = require('graphql-type-json');
const { GraphQLScalarType, Kind, GraphQLEnumType } = require('graphql');

const PostEnumType = new GraphQLEnumType({
  name: 'PostEnum',
  values: {
    REMOVE: {
      value: 0,
    },
    READY: {
      value: 1,
    },
    DRAFT: {
      value: 2,
    },
  },
});

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

type PostInput = {
  authorId: Number,
  title: String
}

const authors = [
  { id: 1, name: 'milkmidi' },
  { id: 2, name: '奶綠茶' },
  { id: 3, name: 'PiPi' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2, status: 0 },
  { id: 2, authorId: 2, title: 'Welcome to Apollo', votes: 3, status: 2 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1, status: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7, status: 1 },
];
const resolvers = {
  Query: {
    hello(parent, args, context, info) {
      // console.log(info.fieldName);
      return 'world';
    },
    posts(parent, args, context, info) {
      return posts;
    },
    authors() {
      return authors;
    },
    author: (parent, { id }) => find(authors, { id }),
    foo() {
      const aField = { obj: 123456, hi: 'milkmidi' };
      return { aField };
    },
    date() {
      return { created: new Date() };
    },
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
      const input:PostInput = args.input;
      console.log(input);
      return posts[posts.length - 1];
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
