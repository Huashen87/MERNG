import { gql } from 'apollo-server';
import postType from './post';
import userType from './user';

const basicTypes = gql`
  type Query
  type Mutation
`;

export default [basicTypes, postType, userType];
