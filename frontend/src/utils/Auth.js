class Auth {
  constructor({ url }) {
    this._url = url;
  }

  _ifcheck(res) {
    if(res.ok) {
      return res.json()
    }
    throw new Error('Ошибка ' + res.status);
  }

  registration({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(this._ifcheck)
  }

  Login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({email, password})
    })
      .then(this._ifcheck)
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
      .then(this._ifcheck);
  }
}

export const authApi = new Auth({
  url: "http://localhost:3000"
});
