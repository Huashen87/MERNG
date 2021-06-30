import { gql } from 'apollo-server';

const userType = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  input registerInput {
    username: String!
    password: String!
    email: String!
  }

  input loginInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    register(input: registerInput): User!
    login(input: loginInput): User!
  }
`;

export default userType;
