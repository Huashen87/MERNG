import { createContext, Reducer, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

interface UserPayload {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  token: string;
}

interface AuthContextType {
  user: UserPayload | null;
  login: (userPayload: UserPayload) => void;
  logout: () => void;
}

interface AuthReducer extends Reducer<AuthContextType, ActionType> {}

interface ActionType {
  payload: UserPayload | null;
  type: ActionTypes;
}

enum ActionTypes {
  'LOGIN',
  'LOGOUT',
}

const initialState = { user: null } as AuthContextType;

const token = localStorage.getItem('token');
if (token) {
  const jwt = jwtDecode<any>(token);
  if (jwt.exp * 1000 < Date.now()) localStorage.removeItem('token');
  else initialState.user = jwt;
}

const AuthContext = createContext<AuthContextType>({ user: null } as AuthContextType);

function authReducer(state: AuthContextType, action: ActionType) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer<AuthReducer>(authReducer, initialState);
  const login = (userData: UserPayload) => {
    localStorage.setItem('token', userData.token);
    dispatch({
      payload: userData,
      type: ActionTypes.LOGIN,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({
      payload: null,
      type: ActionTypes.LOGOUT,
    });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
};

export { AuthContext, AuthProvider };
