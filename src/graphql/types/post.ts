import { gql } from 'apollo-server';

const postType = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  extend type Query {
    posts: [Post]!
  }
`;

export default postType;
