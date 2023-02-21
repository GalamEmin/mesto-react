class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _makeRequest(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((obj) => {
      return obj;
    })
  }

  getInitialCards() {
    const promise = fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
  
    return this._makeRequest(promise);
  }

  getUserInfo() {
    const promise = fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }
  
  setUserInfo(userData) {
    const promise = fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });

    return this._makeRequest(promise);
  }

  addCard(data) {
    const promise = fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })

    return this._makeRequest(promise);
  }

  deleteCard(id) {
    const promise = fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  changeLikeCardStatus(id, isLiked) {
    const promise = fetch(this._url + `/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  setUserAvatar(data) {
    const promise = fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });

    return this._makeRequest(promise);
  }
}

export default new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '7fecce1d-0c55-465f-89f3-15e630f20527',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})