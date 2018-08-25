
const typeDefs = `
  scalar JSON
  scalar Date
  # scalar PostEnum

  type Foo {
    aField: JSON
  }
  type MyType {
    created: Date
  }

  type Author {
    id: Int!
    name: String
    posts: [Post] # the list of Posts by this author
  }

  enum PostEnum{
    READY
    DRAFT
    REMOVE
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
    status: PostEnum
  }

  # the schema allows the following query:
  type Query {
    # you say hello, I say world.
    hello: String
    posts: [Post]
    authors: [Author]
    author(id: Int!): Author
    foo: Foo
    date: MyType
  }

  input PostInput {
    authorId: Int!
    title: String!
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (postId: Int! ): Post
    createPost(input: PostInput): Post
  }

  # default query Name: Query
  schema {
    query: Query
    mutation: Mutation
  }
`;
module.exports = typeDefs;
