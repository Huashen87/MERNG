import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import AuteRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuteRoute exact path="/login" component={Login} />
          <AuteRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
