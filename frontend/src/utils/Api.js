class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _ifcheck(res) {
    if(res.ok) {
      return res.json()
    }
    throw new Error('ошибка!')
  }

  // Загрузка информации о пользователе с сервера
  getInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._ifcheck)
  }


  // Загрузка карточек с сервера
  getCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._ifcheck)
  }

  // Редактирование профиля
  editProfile(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._ifcheck)
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._ifcheck)
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._ifcheck)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._ifcheck)
  }

  addLiked(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._ifcheck)
  }

  changeAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._ifcheck)
  }
}

export const api = new Api({
  url: 'http://api.vanondanon.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
})
