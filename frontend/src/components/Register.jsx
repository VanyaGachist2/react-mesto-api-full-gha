import { useState } from "react";
import { Link } from "react-router-dom";


function Register({ handleRegister, statusText }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleRegister(formValue.email, formValue.password);
  }

  return (
    <section className="registration">
      <h1 className='registration__title'>Регистрация</h1>
        <form className='registration__form' onSubmit={handleSubmit}>
          <input className='registration__input'
            type='email'
            id="email"
            placeholder='Email'
            name='email'
            value={formValue.email}
            onChange={handleChange}
            required
            />
          <input className='registration__input'
            type='password'
            id='password'
            name='password'
            placeholder='Пароль'
            value={formValue.password}
            onChange={handleChange}
            required
            />
          <button className='registration__button' type='submit'>{statusText ? 'Регистрация...' : 'Зарегистрироваться'}</button>
        </form>
        <p className="registration__subtitle">Уже зарегистрированы? <Link className="registration__subtitle_color_white" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default Register;
