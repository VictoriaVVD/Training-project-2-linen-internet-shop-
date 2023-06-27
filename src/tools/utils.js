
export const findWordEnd = (n, word) => {
    
    if (n % 10 === 1 || n === 1) {
        return word
    } else if ((n % 100) % 10 === 1 || n % 10 > 4 || n % 10 === 0) {
            return word + "ов";
    } else return word + "а";
}

export const timeOptions = {
    day: 'numeric',
    month: 'short', 
    year: "numeric",
}

export const filterItemsByAuthor = (items, userId) => {
    return items.filter(e => e.author._id === userId)
}
export const findItemLiked = (item, userId) => {
    return item.likes?.some(e => e === userId);
}

export const sortProductsParameters = [
    {id: "popular", title: "Популярное"}, 
    {id: "byRate", title: "По рейтингу"}, 
    {id: "newProduct", title: "Сначала новые"}, 
    {id: "cheapFirst", title: "По убыванию цены"}, 
    {id: "expensiveFirst", title: "По возрастанию цены"}, 
    {id: "sale", title: "По размеру скидки"}, 
]

export const sortPostsParameters = [
    {id: "popular", title: "Популярное"}, 
    {id: "byAlphabet", title: "По алфавиту"}, 
    {id: "byDate", title: "По дате размещения"},
    {id: "byComments", title: "По обсуждаемости"},
]

export const countRateNum = (reviews) => {
    if (!reviews || !reviews.length) {
        return 0;
    }
    const ratingTotal = reviews.reduce((accum, el) => accum += el.rating, 0)
        return ratingTotal / reviews.length;
}

export function parseJwt (token) {
    if (!token) return null;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
        window
        .atob(base64)
        .split('')
        .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
