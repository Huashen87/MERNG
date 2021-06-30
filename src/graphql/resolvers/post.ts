import Post from '../../models/Post';

const postResolver = {
  Query: {
    posts: async () => {
      try {
        return await Post.find({});
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default postResolver;
