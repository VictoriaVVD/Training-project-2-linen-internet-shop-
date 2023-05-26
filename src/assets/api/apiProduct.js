const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject("Error", res.status);
}

class Api {
    constructor (info) {
        this.baseUrl = info.baseUrl;
        this.headers = info.headers;
        this.basePostUrl = info.basePostUrl;
    }

    getProductList() {
        return fetch(`${this.baseUrl}products`, {
            method: 'GET',
            headers: this.headers,
        })
        .then(onResponse)
    
    }
    getProductById(id) {
        return fetch(`${this.baseUrl}products/${id}`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    searchProduct(path) {
        return fetch(`${this.baseUrl}products/search?query=${path}`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    toggleCardLike (productId, like) {
        return fetch(`${this.baseUrl}products/likes/${productId}`, {
            headers: this.headers,
            method: like ? "DELETE" : "PUT",
        })
        .then(onResponse)
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}users/me`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    addReview(productId, data) {
        return fetch(`${this.baseUrl}products/review/${productId}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    deleteReview(productId, reviewId) {
        return fetch(`${this.baseUrl}products/review/${productId}/${reviewId}`, {
            method: "DELETE",
            headers: this.headers,
        })
        .then(onResponse)
    }

}

const config = {
    baseUrl: "https://api.react-learning.ru/",
    basePostUrl: "https://api.react-learning.ru/v2/group-12/posts",
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNmMzMDMyOTFkNzkwYjNmYzIyYjMiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDE4ODIzLCJleHAiOjE3MTM1NTQ4MjN9.eG8M6O1kUXvXhxIu3jTMtOcru6qiIG0_i-DDZcu2SgA",
    }
}

export const apiProduct = new Api(config);