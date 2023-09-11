export const url = 'http://localhost:3000';

export const register = ({ email, password }) => {

    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({ email, password }),
            credentials: 'include'

    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch(console.error);
};

export const authorize = ({ email, password }) => {

    return fetch(`${url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({ email, password }),
            credentials: 'include'
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch(console.error)
}

export const getContent = (token) => {
    return fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch(console.error)
}