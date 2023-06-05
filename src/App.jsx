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
import { fetchGetUser } from "./store/slices/userSlice";
import { countRateNum, filterItemsByAuthor, findItemLiked } from "./store/utilsStore";
import { fetchGetProductList, fetchSearch } from "./store/slices/productsSlice";
import { fetchGetPostList } from "./store/slices/postsSlice";
import { useDebounce } from "./hooks/debounceValue";
import { About } from "./components/Companie`sInfo/About";



function App() {

  const [cards, setCards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [isAuthorized, setAuthorized] = useState(true);
  const [favouritesPosts, setFavouritesPosts] = useState();
  const [modalActive, setModalActive] = useState(false);

  
  const dispatch = useDispatch();
  // const user = useSelector(s => s.user);
  // console.log({user});

  
  const debounceValueInApp = useDebounce(search);

  // const handleProductLike = async (product, isLiked) => {
  //   const updatedCard = await apiProduct.toggleCardLike(product._id, isLiked);

  //   setCards(state => [...state.map(e => e._id === updatedCard?._id ? updatedCard : e)]);
    
  //   isLiked 
  //   ? setFavourites(state => state.filter(e => e._id !== updatedCard._id))
  //   : setFavourites(state => [updatedCard, ...state]);

  //   return isLiked
  // }

  // const handlePostLike = async (post, isLiked) => {
  //   const updatedPost = await apiPost.togglePostLike(post._id, isLiked);

  //   setPosts(state => [...state.map(e => e._id === updatedPost?._id ? updatedPost : e)]);
    
  //   isLiked 
  //   ? setFavouritesPosts(state => state.filter(e => e._id !== updatedPost._id))
  //   : setFavouritesPosts(state => [updatedPost, ...state]);

  //   return isLiked
  // }
  
  // const findLiked = (product, user) => {
  //   return product.likes.some(e => e === user)
  // }
  // const findLikedPosts = (posts, user) => {
  //   return posts.likes.some(e => e === user)
  // }

  // const countRateNum = (reviews) => {
  //   if (!reviews || !reviews.length) {
  //     return 0;
  //   }
  //   const ratingTotal = reviews.reduce((accum, el) => accum += el.rating, 0)
  //   return ratingTotal / reviews.length;
  // }

  // const onSort = (sortId) => {
  //   switch (sortId) {
  //     case 'popular':
  //       // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
  //       return setCards(cards => [...cards.filter(e => e.likes.length)]);
  //     case 'byRate':
  //       return setCards(cards => [...cards.sort((a, b) => productRateNum(b.reviews) - productRateNum(a.reviews))]);
  //     case 'newProduct':
  //       return setCards(cards => [...cards.filter(e => e.tags.includes('new'))]);
  //     case 'cheapFirst':
  //       return setCards(cards => [...cards.sort((a, b) => b.price - a.price)]);
  //     case 'expensiveFirst':
  //       return setCards(cards => [...cards.sort((a, b) => a.price - b.price)]);
  //     case 'sale':
  //       return setCards(cards => [...cards.sort((a, b) => b.discount - a.discount)]);
  //     default:
  //       setCards(cards => [...cards.sort((a, b) => b.price - a.price)]);

  //   }
  // }

  // const sortPosts = (sortId) => {
  //   switch (sortId) {
  //     case 'popular':
  //       // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
  //       return setPosts(posts => [...posts.filter(e => e.likes.length)]);
  //     case 'byRate':
  //       return setPosts(posts => [...posts.sort((a, b) => countRateNum(b.reviews) - countRateNum(a.reviews))]);
  //     case 'byAuthor':
  //       return setPosts(posts => [...posts.sort((a, b) => b.author - a.author)]);
  //     case 'byAlphabet':
  //       return setPosts(posts => [...posts.sort()]);
  //     case 'byDate':
  //       return setPosts(posts => [...posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))]);
  //     default:
  //       setPosts(posts => [...posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))]);

  //   }
  // }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    dispatch(fetchSearch(debounceValueInApp))
  }, [debounceValueInApp, dispatch]);

  // useEffect(() => {
  //   if(!user.data._id) return;
  //   apiProduct.getProductList().then(data => {
  //     const filteredCards = filtered(data.products);
  //     // dispatch(setList(filteredCards))
  //     setCards(filteredCards);
  //     const favourites = filteredCards.filter(e => findLiked(e, user.data?._id));
  //     setFavourites(favourites);
  //     })
  //   .catch(error => console.log(new Error(error.message)));
  // }, [dispatch, user.data._id]);

  // useEffect(() => {
  //   Promise.all([apiPost.getAllPosts()])
  //     .then(([posts]) => {
  //       const filteredPosts = filterItemsByAuthor(posts)
  //       setPosts(filteredPosts);

  //       const favouritesPosts = filteredPosts.filter(e => findItemLiked(e, user.data?._id));
  //       setFavouritesPosts(favouritesPosts);
  //       })
  //       .catch(error => console.log(new Error(error.message)));
  // }, [user.data._id]);

  useEffect(() => {
    dispatch(fetchGetUser())
      .then(() => dispatch(fetchGetProductList()))
      .then(() => dispatch(fetchGetPostList()))
  }, [dispatch])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthorized(true)
    }
  }, [])

  const cardsValue = {
    cards,
    posts,
    search,

    modalActive,
    setModalActive,
    countRateNum,
    isAuthorized,
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
                <Route path="/about" element={<About />} />
                <Route path="*" element={<div className="pageNotFound">Страница не найдена</div>}/>
                <Route path="/singup" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <RegisterForm />
                  </Modal>
                } />
                <Route path="/singin" element={
                  <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <AuthorizationForm />
                    {isAuthorized ? <Navigate to={"/profile"} /> : ""}
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