import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useToggleLikeMutation } from '../generated/graphql';

interface LikeButtonProps {
  post: {
    id: string;
    likesCount: number;
    likes: any[];
  };
}

function LikeButton({ post: { id, likesCount, likes } }: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const [toggleLike] = useToggleLikeMutation();

  const handleOnLike = async () => await toggleLike({ variables: { postId: id } });

  useEffect(() => {
    if (user) setLiked(!!likes.find((like) => like?.username === user.username));
  }, [user, likes]);

  return user ? (
    liked ? (
      <Button as="div" labelPosition="right" onClick={handleOnLike}>
        <Button color="pink" icon>
          <Icon name="heart" />
        </Button>
        <Label basic color="pink" pointing="left">
          {likesCount}
        </Label>
      </Button>
    ) : (
      <Button as="div" labelPosition="right" onClick={handleOnLike}>
        <Button basic color="pink" icon>
          <Icon name="heart" />
        </Button>
        <Label basic color="pink" pointing="left">
          {likesCount}
        </Label>
      </Button>
    )
  ) : (
    <Button as={Link} labelPosition="right" to="/login">
      <Button basic color="pink" icon>
        <Icon name="heart" />
      </Button>
      <Label basic color="pink" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
