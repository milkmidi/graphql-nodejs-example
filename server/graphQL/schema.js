
const typeDefs = `
  scalar JSON
  scalar Date

  type Foo {
    aField: JSON
  }
  type MyType {
    created: Date
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    text: String
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    foo: Foo
    date: MyType
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }

  # default query Name: Query
  schema {
    query: Query
  }
`;
module.exports = typeDefs;
