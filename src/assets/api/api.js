const onSuccess = (res) => {
    return res.json();
}

class Api {
    constructor (info) {
        this.baseUrl = info.baseUrl;
        this.headers = info.headers;
    }

    getProductList() {
        return fetch(`${this.baseUrl}products`, {
            method: 'GET',
            headers: this.headers,
        })
        .then(onSuccess)
    
    }
    getProductById(id) {
        return fetch(`${this.baseUrl}products/${id}`, {
            headers: this.headers,
        })
        .then(onSuccess)
    }

    searchProduct(path) {
        return fetch(`${this.baseUrl}products/search?query=${path}`, {
            headers: this.headers,
        })
        .then(onSuccess)
    }

    // addLike(productId) {
    //     return fetch(`${this.baseUrl}products/likes/${productId}`, {
    //         headers: this.headers,
    //         method: "PUT",
    //     })
    //     .then(onResponse);
    // }
    // deleteLike(productId) {
    //     return fetch(`${this.baseUrl}products/likes/${productId}`, {
    //         headers: this.headers,
    //         method: "DELETE",
    //     })
    //     .then(onResponse);
    // }
    toggleCardLike (productId, isLiked) {
        return fetch(`${this.baseUrl}products/likes/${productId}`, {
            headers: this.headers,
            method: isLiked ? "DELETE" : "PUT",
        })
        .then(onSuccess)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}users/me`, {
            headers: this.headers,
        })
        .then(onSuccess)
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru/",
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNmMzMDMyOTFkNzkwYjNmYzIyYjMiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDE4ODIzLCJleHAiOjE3MTM1NTQ4MjN9.eG8M6O1kUXvXhxIu3jTMtOcru6qiIG0_i-DDZcu2SgA",
    }
}


export const api = new Api(config);