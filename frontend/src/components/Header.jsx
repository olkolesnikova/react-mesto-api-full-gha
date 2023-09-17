import headerLogo from '../images/header_logo.png';

const Header = ({children}) => {

  return (

    <header className="header">
      <img src={headerLogo} alt="Логотип проекта Место" className="header__logo" />
      {children}      
    </header>
  )

}

export default Header;