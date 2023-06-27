const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject("Error", res.status, res.message);
}

class Api {
    constructor (info) {
        this.baseUrl = info.baseUrl;
        this.headers = info.headers;
        // this.updateHeaders = updateHeaders;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}users/me`, {
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }
    
    singin(data) {
        return fetch(`${this.baseUrl}signin`, {
            method: "POST",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    singup(data) {
        return fetch(`${this.baseUrl}signup`, {
            method: "POST",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    forgotPassword(data) {
        return fetch(`${this.baseUrl}forgot-password`, {
            method: "POST",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    resetPassword(data, token, email) {
        return fetch(`${this.baseUrl}password-reset/${token}`, {
            method: "PATCH",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify({...data, email}),
        })
        .then(onResponse)
    }

    changeAvatar(data) {
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: "PATCH",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    updateUserInfo(data) {
        return fetch(`${this.baseUrl}users/me`, {
            method: "PATCH",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

}

const config = {
    baseUrl: "https://api.react-learning.ru/",
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNmMzMDMyOTFkNzkwYjNmYzIyYjMiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDE4ODIzLCJleHAiOjE3MTM1NTQ4MjN9.eG8M6O1kUXvXhxIu3jTMtOcru6qiIG0_i-DDZcu2SgA",
    },
    
}

export const apiUser = new Api(config);