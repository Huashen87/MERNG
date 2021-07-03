import post from './post';
import user from './user';
import comment from './comment';

const resolvers = {
  Post: {
    likesCount: ({ likes }: any) => likes.length,
    commentsCount: ({ comments }: any) => comments.length,
  },
  Query: {
    ...post.Query,
  },
  Mutation: {
    ...post.Mutation,
    ...user.Mutation,
    ...comment.Mutation,
  },
  Subscription: {
    ...post.Subscription,
  },
};

export default resolvers;
