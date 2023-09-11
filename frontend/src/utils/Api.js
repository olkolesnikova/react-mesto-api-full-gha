class Api {

    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
        this.authorization = config.headers.authorization;
    }

    request(url, options) {

        return fetch(url, options)
            .then(this.handleResponse)
    }

    getCards() {

        return this.request(`${this.url}/cards`, { headers: this.headers, credentials: 'include' })
    }

    getUserInfo() {

        return this.request(`${this.url}/users/me`, { headers: this.headers, credentials: 'include' })

    }

    editProfileData(data) {

        return this.request(`${this.url}/users/me`, {

            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description,
                avatar: data.avatar
            }),
            credentials: 'include'
        })
    }

    addNewCard(data) {

        return this.request(`${this.url}/cards`, {

            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            credentials: 'include'
        })
    }

    deleteCard(cardId) {

        return this.request(`${this.url}/cards/${cardId}`, {

            method: 'DELETE',
            headers: this.headers,
            credentials: 'include'
        })
    }

    addLike(cardId) {

        return this.request(`${this.url}/cards/${cardId}/likes`, {

            method: 'PUT',
            headers: this.headers,
            credentials: 'include'
        })

    }

    deleteLike(cardId) {

        return this.request(`${this.url}/cards/${cardId}/likes`, {

            method: 'DELETE',
            headers: this.headers,
            credentials: 'include'
        })
    }

    updateUserAvatar(avatar) {

        return this.request(`${this.url}/users/me/avatar`, {

            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar.avatar
            }),
            credentials: 'include'
        })
    }

    handleResponse(res) {

        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

export const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        //authorization: '71e140ff-2f6f-4fd2-8662-cbadd1dca0b9',
        'Content-type': 'application/json'
    }
})



