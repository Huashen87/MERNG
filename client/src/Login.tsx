import { useContext, useState } from 'react';
import { Form, Grid, Message } from 'semantic-ui-react';
import { useLoginMutation } from './generated/graphql';
import { useForm } from './util/hooks';
import { History } from 'history';
import { UserInputError } from './util/type';
import { AuthContext } from './context/auth';

interface LoginInput {
  username: string;
  password: string;
}

function Login(props: { history: History }) {
  const { history } = props;
  const context = useContext(AuthContext);
  const [error, setError] = useState<UserInputError | undefined>();

  const { handleOnChange, handleOnSubmit, value } = useForm<LoginInput>(helper, {
    username: '',
    password: '',
  });

  const [registerMutation, { loading }] = useLoginMutation({
    update: (_, { data }) => {
      setError(undefined);
      data && context.login(data.login);
      history.push('/');
    },
    onError: (err) => {
      if (err.graphQLErrors[0])
        setError({ field: err.graphQLErrors[0].extensions?.field, message: err.message });
    },
    variables: value,
  });

  function helper() {
    registerMutation();
  }

  return (
    <Grid columns="equal" centered>
      <Grid.Row>
        <h1>Login</h1>
      </Grid.Row>
      <Grid.Column width={6}>
        <Form onSubmit={handleOnSubmit}>
          <Form.Input
            fluid
            name="username"
            label="username"
            placeholder="username..."
            onChange={handleOnChange}
            value={value.username}
            error={error?.field === 'username'}
          />
          <Form.Input
            fluid
            name="password"
            label="password"
            placeholder="password..."
            type="password"
            onChange={handleOnChange}
            value={value.password}
            error={error?.field === 'password'}
          />
          <Form.Button primary loading={loading}>
            Register
          </Form.Button>
        </Form>
        {error && <Message error content={error?.message} />}
      </Grid.Column>
    </Grid>
  );
}

export default Login;
