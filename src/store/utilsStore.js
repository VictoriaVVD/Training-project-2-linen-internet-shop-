export const isLoading = (data) => {
    return data.type.endsWith("pending");
}
export const isError = (data) => {
    return data.type.endsWith("rejected");
}
export const filterItemsByAuthor = (items) => {
    const userId = "64416c303291d790b3fc22b3";
    return items.filter(e => e.author._id === userId)
}
export const findItemLiked = (item, userId) => {
    return item.likes.some(e => e === userId);
}

export const sortingParameters = [
    {id: "popular", title: "Популярное"}, 
    {id: "byRate", title: "По рейтингу"}, 
    {id: "newProduct", title: "Новинки"}, 
    {id: "cheapFirst", title: "По убыванию цены"}, 
    {id: "expensiveFirst", title: "По возрастанию цены"}, 
    {id: "sale", title: "По размеру скидки"},
    {id: "byAuthor", title: "По автору"}, 
    {id: "byAlphabet", title: "По алфавиту"}, 
    {id: "byDate", title: "По дате размещения"},
];

export const countRateNum = (reviews) => {
    if (!reviews || !reviews.length) {
        return 0;
    }
    const ratingTotal = reviews.reduce((accum, el) => accum += el.rating, 0)
        return ratingTotal / reviews.length;
}
