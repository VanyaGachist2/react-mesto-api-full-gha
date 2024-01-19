const { useState } = require("react");

function Login({ handleLogin, statusText }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleLogin(formValue.email, formValue.password);
  }

  return (
      <section className='registration'>
        <h1 className='registration__title'>Войти</h1>
        <form className='registration__form' onSubmit={handleSubmit}>
          <input className='registration__input'
            type='email'
            id="email"
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={formValue.email}
            required
            />
          <input className='registration__input'
            type='password'
            id='password'
            name='password'
            placeholder='Пароль'
            onChange={handleChange}
            value={formValue.password}
            required
            />
          <button className='registration__button' type='submit'>{statusText ? 'Вход...' : 'Войти'}</button>
        </form>
      </section>
  )
}

export default Login;
