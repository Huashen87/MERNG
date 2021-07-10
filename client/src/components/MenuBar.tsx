import { useState, useContext } from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  const pathname = window.location.pathname.substr(1) || 'home';
  const [activeItem, setActiveItem] = useState<string | undefined>(pathname);

  const handleItemClick = (
    _: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => setActiveItem(name);

  const handleOnLogout = () => {
    logout();
    setActiveItem('home');
    history.push('/');
  };

  return (
    <Menu pointing secondary size="massive" color="teal">
      {!!user ? (
        <>
          <Menu.Item name={user.username} active as={Link} to="/" />
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={handleOnLogout} />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
}

export default MenuBar;
