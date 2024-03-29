class Api {
  constructor({ url }) {
    this._url = url;
  }

  _ifcheck(res) {
    if(res.ok) {
      return res.json()
    }
    throw new Error('ошибка!')
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    if(token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    } else {
      return {
        'Content-Type': 'application/json'
      }
    }
  }

  // Загрузка информации о пользователе с сервера
  getInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include',
    })
    .then(this._ifcheck)
  }


  // Загрузка карточек с сервера
  getCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include',
    })
    .then(this._ifcheck)
  }

  // Редактирование профиля
  editProfile(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._getHeaders(),
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
      headers: this._getHeaders(),
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
      headers: this._getHeaders()
    })
    .then(this._ifcheck)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getHeaders()
    })
    .then(this._ifcheck)
  }

  addLiked(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._getHeaders()
    })
    .then(this._ifcheck)
  }

  changeAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._ifcheck)
  }
}

export const api = new Api({
  url: 'https://api.vanondanon.nomoredomainsmonster.ru',
})
