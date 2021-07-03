import { gql } from 'apollo-server';

const commentType = gql`
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  extend type Mutation {
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;

export default commentType;
