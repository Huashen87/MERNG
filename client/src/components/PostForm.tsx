import { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { useCreatePostMutation, GetPostsDocument, PostFragment } from '../generated/graphql';
import { useForm } from '../util/hooks';
import { UserInputError } from '../util/type';

function PostForm() {
  const [error, setError] = useState<UserInputError | undefined>();

  const { value, handleOnChange, handleOnSubmit } = useForm<{ body: string }>(helper, {
    body: '',
  });

  const [createPost, { loading }] = useCreatePostMutation({
    update: (proxy, { data }) => {
      setError(undefined);
      const queryData = proxy.readQuery<{ getPosts: PostFragment[] }>({
        query: GetPostsDocument,
      });
      const newData = [data!.createPost, ...queryData!.getPosts];
      proxy.writeQuery({ query: GetPostsDocument, data: { getPosts: newData } });

      value.body = '';
    },
    onError: (err) => {
      if (err.graphQLErrors[0])
        setError({ field: err.graphQLErrors[0].extensions?.field, message: err.message });
    },
    variables: value,
  });

  function helper() {
    createPost();
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Header as="h1">Create Post</Header>
      <Form.Input
        name="body"
        placeholder="Enter your post content..."
        onChange={handleOnChange}
        value={value.body}
        error={!!error}
      />
      <Form.Button color="teal" loading={loading} children="Post" />
    </Form>
  );
}

export default PostForm;
