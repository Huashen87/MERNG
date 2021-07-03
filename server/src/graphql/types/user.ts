import { gql } from 'apollo-server';

const userType = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): User!
  }
`;

export default userType;
