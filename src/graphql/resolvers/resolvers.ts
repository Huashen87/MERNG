import post from './post';
import user from './user';

const resolvers = {
  Query: {
    ...post.Query,
  },
  Mutation: {
    ...user.Mutation,
  },
};

export default resolvers;
