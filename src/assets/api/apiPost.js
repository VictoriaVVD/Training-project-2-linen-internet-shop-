const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject("Error", res.status);
}

class Api {
    constructor (info) {
        this.headers = info.headers;
        this.basePostUrl = info.basePostUrl;
    }

    getAllPosts() {
        return fetch(`${this.basePostUrl}`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    getPostById(id) {
        return fetch(`${this.basePostUrl}/${id}`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    togglePostLike(postId, liked) {
        return fetch(`${this.basePostUrl}/likes/${postId}`, {
            method: liked ? "DELETE" : "PUT",
            headers: this.headers,
        })
        .then(onResponse)
    }
}

const config = {
    basePostUrl: "https://api.react-learning.ru/v2/group-12/posts",
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNmMzMDMyOTFkNzkwYjNmYzIyYjMiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDE4ODIzLCJleHAiOjE3MTM1NTQ4MjN9.eG8M6O1kUXvXhxIu3jTMtOcru6qiIG0_i-DDZcu2SgA",
    }
}

export const apiPost = new Api(config);