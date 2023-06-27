const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject("Error", res.status);
}

class Api {
    constructor (info) {
        this.headers = info.headers;
        this.basePostUrl = info.basePostUrl;
        // this.updateHeaders = updateHeaders;
    }

    getAllPosts() {
        return fetch(`${this.basePostUrl}`, {
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }

    getPostById(id) {
        return fetch(`${this.basePostUrl}/${id}`, {
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }
    searchPosts(path) {
        return fetch(`${this.basePostUrl}/search/?query=${path}`, {
            headers: this.headers,
        })
        .then(onResponse)
    }

    togglePostLike(postId, liked) {
        return fetch(`${this.basePostUrl}/likes/${postId}`, {
            method: liked ? "DELETE" : "PUT",
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }
    updatePost(postId, data) {
        return fetch(`${this.basePostUrl}/${postId}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        })
    }

    addComment(postId, data) {
        return fetch(`${this.basePostUrl}/comments/${postId}`, {
            method: "POST",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    deleteComment(postId, commentId) {
        return fetch(`${this.basePostUrl}/comments/${postId}/${commentId}`, {
            method: "DELETE",
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }
    
    addNewPost(data) {
        return fetch(`${this.basePostUrl}`, {
            method: "POST",
            // ...this.updateHeaders(),
            headers: this.headers,
            body: JSON.stringify(data),
        })
        .then(onResponse)
    }

    deletePost(postId) {
        return fetch(`${this.basePostUrl}/${postId}`, {
            method: "DELETE",
            // ...this.updateHeaders(),
            headers: this.headers,
        })
        .then(onResponse)
    }

    paginatePosts(path) {
        return fetch(`${this.basePostUrl}/paginate?page=<1>&limit=<8>&query=<${path}>`, {
            headers: this.headers,
        })
        .then(onResponse)
    }
}

// const updateHeaders = () => {
//     return {
//         headers: {
//             "Content-Type": "application/json",
//             "authorization": localStorage.getItem("token"),
//         }
//     }
// }

const config = {
    basePostUrl: "https://api.react-learning.ru/v2/group-12/posts",
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxNmMzMDMyOTFkNzkwYjNmYzIyYjMiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyMDE4ODIzLCJleHAiOjE3MTM1NTQ4MjN9.eG8M6O1kUXvXhxIu3jTMtOcru6qiIG0_i-DDZcu2SgA",
    }
}

export const apiPost = new Api(config);