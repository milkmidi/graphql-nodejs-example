
export const User = `
  type User {
    name     : String!
    email    : String!
    password : String!
  }
`;
export const Author = `
  type Author {
    id: Int!
    name: String
    posts: [Post] # the list of Posts by this author
  }
`;

export const Post = `
  type Post {
    "就是id"
    id: Int!
    "標題"
    title: String
    "作者"
    author: Author
    "按讚數"
    votes: Int
    "狀態"
    status: PostEnum
  }
`;

export const Token = `
  type Token {
    token: String!
  }
`;

export const typeDefs = `
  scalar JSON
  scalar Date
  # scalar PostEnum

  type Foo {
    aField: JSON
  }
  type MyType {
    label: String
    created: Date
  }
  enum PostEnum{
    "準備"
    READY
    "草稿"
    DRAFT
    "移掉"
    REMOVE
  }
  "我是PostInput"
  input PostInput {
    "作者id"
    authorId: Int!
    "標題"
    title: String!
  }

  
`;


export const Query = `
  # the schema allows the following query:
  type Query {
    "you say hello, I say world."
    hello: String
    posts(filter:JSON): [Post]
    "取得所有 authors"
    authors: [Author]
    "取得指定 author (id 必填)"
    author(id: Int!): Author
    foo: Foo
    myType: MyType

    "就是一堆 User"
    users: [User]
  }
`;

export const Mutation = `
  # this schema allows the following mutation:
  type Mutation {
    "按讚呀"
    upvotePost (postId: Int! ): Post
    "新增一筆Post"
    createPost(input: PostInput): Post

    "注"
    signUp(name: String!, email: String!, password: String!): User

    "登"
    login(email: String!, password: String!): Token
  }
`;
