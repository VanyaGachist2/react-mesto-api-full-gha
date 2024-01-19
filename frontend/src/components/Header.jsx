import { Route, Routes } from 'react-router';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header ({ mail, exit }) {
  return (
    <header className="header">
        <img className="header__logo" alt="Россия" src={logo} />
        <Routes>
          <Route path='/' element={
            <div className='header__log'>
              <p className='header__mail'>{mail}</p>
              <p className='header__condition' onClick={exit}>Выйти</p>
            </div>
          } />
          <Route path='/sign-in' element={
            <div className='header__log'>
              <Link to="/sign-up" className='header__condition'>Регистрация</Link>
            </div>
          } />
          <Route path='/sign-up' element={
            <div className='header__log'>
              <Link to="/sign-in" className='header__condition'>Войти</Link>
            </div>
          } />
        </Routes>
    </header>
  )
}

export default Header;
