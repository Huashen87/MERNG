import { Grid, Transition } from 'semantic-ui-react';
import { GetPostsQuery } from '../generated/graphql';
import PostCard from './PostCard';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import PostForm from './PostForm';

function Posts(props: GetPostsQuery) {
  const { getPosts: posts } = props;
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Grid.Column style={{ marginBottom: 20 }}>
          <PostForm />
        </Grid.Column>
      )}
      <Transition.Group>
        {posts.map(
          (post) =>
            post && (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard {...post} />
              </Grid.Column>
            )
        )}
      </Transition.Group>
    </>
  );
}

export default Posts;
