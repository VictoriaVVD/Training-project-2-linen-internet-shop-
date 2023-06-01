import React, { useEffect, useState } from "react";
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FavouritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { Footer } from './components/Footer/Footer';
import { apiProduct } from "./assets/api/apiProduct";
import { apiPost } from "./assets/api/apiPost";
import { Routes, Route, Navigate } from "react-router";
import { CardContext } from "./context/cardContext";
import { Home } from "./pages/Home/Home";
import { Modal } from "./components/Modal/Modal";
import { RegisterForm } from "./components/Form/RegisterForm";
import { AuthorizationForm } from "./components/Form/AuthorizationForm";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { ForgotPassForm } from "./components/Form/ForgotPassForm";
import { PostPage } from "./pages/PostPage/PostPage";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";
import { AddProductForm } from "./components/Form/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "./store/slices/productsSlice";
import { getUser } from "./store/slices/userSlice";


const useDebounce = (path) => {
  const [debounceValue, setDebounceValue] = useState(path);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path)
  }, 1000);

  return () => clearTimeout(timeout)
    }, [path]) 

  return debounceValue;
}

function App() {

  const [cards, setCards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [isAuthorized, setAuthorized] = useState(true);
  const [favourites, setFavourites] = useState();
  const [favouritesPosts, setFavouritesPosts] = useState();
  const [modalActive, setModalActive] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector(s => s.user);
  const filtered = (cards) => {
    return cards.filter(e => e.author._id === "64416c303291d790b3fc22b3")
  }

  
  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, isLiked) => {
    const updatedCard = await apiProduct.toggleCardLike(product._id, isLiked);

    setCards(state => [...state.map(e => e._id === updatedCard?._id ? updatedCard : e)]);
    
    isLiked 
    ? setFavourites(state => state.filter(e => e._id !== updatedCard._id))
    : setFavourites(state => [updatedCard, ...state]);

    return isLiked
  }

  const handlePostLike = async (post, isLiked) => {
    const updatedPost = await apiPost.togglePostLike(post._id, isLiked);

    setPosts(state => [...state.map(e => e._id === updatedPost?._id ? updatedPost : e)]);
    
    isLiked 
    ? setFavouritesPosts(state => state.filter(e => e._id !== updatedPost._id))
    : setFavouritesPosts(state => [updatedPost, ...state]);

    return isLiked
  }
  
  const findLiked = (product, user) => {
    return product.likes.some(e => e === user)
  }
  const findLikedPosts = (posts, user) => {
    return posts.likes.some(e => e === user)
  }

  const productRateNum = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const ratingTotal = reviews.reduce((accum, el) => accum += el.rating, 0)
    return ratingTotal / reviews.length;
  }

  const onSort = (sortId) => {
    switch (sortId) {
      case 'popular':
        // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
        return setCards(cards => [...cards.filter(e => e.likes.length)]);
      case 'byRate':
        return setCards(cards => [...cards.sort((a, b) => productRateNum(b.reviews) - productRateNum(a.reviews))]);
      case 'newProduct':
        return setCards(cards => [...cards.filter(e => e.tags.includes('new'))]);
      case 'cheapFirst':
        return setCards(cards => [...cards.sort((a, b) => b.price - a.price)]);
      case 'expensiveFirst':
        return setCards(cards => [...cards.sort((a, b) => a.price - b.price)]);
      case 'sale':
        return setCards(cards => [...cards.sort((a, b) => b.discount - a.discount)]);
      default:
        setCards(cards => [...cards.sort((a, b) => b.price - a.price)]);

    }
  }

  const sortPosts = (sortId) => {
    switch (sortId) {
      case 'popular':
        // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
        return setPosts(posts => [...posts.filter(e => e.likes.length)]);
      case 'byRate':
        return setPosts(posts => [...posts.sort((a, b) => productRateNum(b.reviews) - productRateNum(a.reviews))]);
      case 'byAuthor':
        return setPosts(posts => [...posts.sort((a, b) => b.author - a.author)]);
      case 'byAlphabet':
        return setPosts(posts => [...posts.sort()]);
      case 'byDate':
        return setPosts(posts => [...posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))]);
      default:
        setPosts(posts => [...posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))]);

    }
  }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    apiProduct.searchProduct(debounceValueInApp)
    .then(data => setCards(filtered(data)))
    .catch(error => console.log(new Error(error.message)));
  }, [debounceValueInApp]);

  useEffect(() => {
    if(!user.data._id) return;
    apiProduct.getProductList().then(data => {
      const filteredCards = filtered(data.products);
      // dispatch(setList(filteredCards))
      setCards(filteredCards);
      const favourites = filteredCards.filter(e => findLiked(e, user.data?._id));
      setFavourites(favourites);
      })
    .catch(error => console.log(new Error(error.message)));
  }, [dispatch, user.data._id]);

  useEffect(() => {
    Promise.all([apiPost.getAllPosts()])
      .then(([posts]) => {
        const filteredPosts = filtered(posts)
        setPosts(filteredPosts);

        const favouritesPosts = filteredPosts.filter(e => findLikedPosts(e, user.data?._id));
        setFavouritesPosts(favouritesPosts);
        })
        .catch(error => console.log(new Error(error.message)));
  }, [user.data._id]);

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthorized(true)
    }
  }, [])

  const cardsValue = {
    handleLike: handleProductLike,
    handlePostLike,
    cards,
    setCards,
    posts,
    search,
    favourites,
    favouritesPosts,
    onSort,
    sortPosts,
    modalActive,
    setModalActive,
    productRateNum,
  }

  
  return (
    <div className="container">
        <CardContext.Provider value={cardsValue}>
          <Header setSearch={setSearch} />
          <section>
            {isAuthorized
            ? <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CatalogPage />}/>
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/favourites" element={<FavouritesPage />}/>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="*" element={<div className="pageNotFound">Страница не найдена</div>}/>
                <Route path="/singup" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <RegisterForm />
                  </Modal>
                } />
                <Route path="/singin" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <AuthorizationForm />
                  </Modal>
                } />
                <Route path="/forgot-password" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <ForgotPassForm />
                  </Modal>
                } />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/newProduct" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <AddProductForm />
                  </Modal>
                } />
              </Routes>
            : <Navigate to={'/not authorizated'} />}
          </section>
          <Footer />
        </CardContext.Provider>
      </div> 
  );
};

export default App;