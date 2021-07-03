import { gql } from 'apollo-server';

const postType = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    commentsCount: Int!
    likes: [Like]!
    likesCount: Int!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  extend type Query {
    getPosts: [Post]!
    getPost(id: ID!): Post!
  }

  extend type Mutation {
    createPost(body: String!): Post!
    deletePost(id: ID!): Post!
    toggleLike(postId: ID!): Post!
  }

  extend type Subscription {
    newPost: Post!
  }
`;

export default postType;
