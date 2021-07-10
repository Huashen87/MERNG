import { useContext } from 'react';
import { GetPostsDocument, PostFragment, useDeletePostMutation } from '../generated/graphql';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
dayjs.extend(relativeTime);

function PostCard(props: PostFragment) {
  const { id, username, body, createdAt, commentsCount, likesCount, likes } = props;
  const { user } = useContext(AuthContext);

  const [deletePost] = useDeletePostMutation({
    update: (proxy, { data }) => {
      const queryData = proxy.readQuery<{ getPosts: PostFragment[] }>({
        query: GetPostsDocument,
      });
      const newData = queryData!.getPosts.filter((post) => post.id !== data?.deletePost.id);
      proxy.writeQuery({ query: GetPostsDocument, data: { getPosts: newData } });
    },
    onError: (err) => {
      console.log(err);
    },
    variables: {
      id,
    },
  });

  const handleOnDelete = async () => {
    await deletePost({ variables: { id } });
  };

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{dayjs(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ likes, id, likesCount }} />
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button basic color="blue" icon>
            <Icon name="comment" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user?.username === username ? (
          <Button floated="right" icon color="red" onClick={handleOnDelete}>
            <Icon name="trash" />
          </Button>
        ) : null}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
