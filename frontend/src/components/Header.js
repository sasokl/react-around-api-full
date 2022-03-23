import {Link, useHistory} from "react-router-dom";

function Header({email, isLoggedIn, onLogout}) {
  const history = useHistory();
  const location = history.location.pathname;

  function handleLogOut() {
    localStorage.removeItem('jwt');
    onLogout();
    history.push('/signin');
  }

  return (
    <header className="header">
      <div className="logo header__logo" title="logo"/>
      <div className="header__sign-container">
        <p className="header__email-text">{email}</p>
        {location === '/signin' && <Link to='/signup' className='header__link'>Sign up</Link>}
        {location === '/signup' && <Link to='/signin' className='header__link'>Sign in</Link>}
        {isLoggedIn && <button onClick={handleLogOut} className='header__logout-button'>Log out</button>}
      </div>
    </header>
  );
}

export default Header;