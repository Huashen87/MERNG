import { gql } from 'apollo-server';
import commentType from './comment';
import postType from './post';
import userType from './user';

const basicTypes = gql`
  type Query
  type Mutation
  type Subscription
`;

export default [basicTypes, postType, userType, commentType];
