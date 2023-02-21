import logo from '../images/Logo_mesto.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
    </header>
  )
}

export default Header;