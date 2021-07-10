import { Grid } from 'semantic-ui-react';
import Posts from './components/Posts';
import { useGetPostsQuery } from './generated/graphql';

function Home() {
  const { data, loading } = useGetPostsQuery();

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>{!loading && data ? <Posts {...data}></Posts> : <div>Loading</div>}</Grid.Row>
    </Grid>
  );
}

export default Home;
