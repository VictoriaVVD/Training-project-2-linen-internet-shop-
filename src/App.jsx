import React, { useContext, useEffect, useState } from "react";
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FavouritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { Footer } from './components/Footer/Footer';
import { api } from "./assets/api/api";
import { Routes, Route, Navigate } from "react-router";
import { UserContext } from "./context/userContext";
import { CardContext } from "./context/cardContext";
import { Home } from "./pages/Home/home";
import { Modal } from "./components/Modal/Modal";
import { RegisterForm } from "./components/Form/RegisterForm";
import { AuthorizationForm } from "./components/Form/AuthorizationForm";


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
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState([]);
  const [isAuthorized, setAuthorized] = useState(true);
  const [favourites, setFavourites] = useState();
  const [modalActive, setModalActive] = useState(false);
  
  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === "64416c303291d790b3fc22b3")
  }
  
  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, isLiked) => {
    const updatedCard = await api.toggleCardLike(product._id, isLiked);

    const foundIndex = cards.findIndex(e => e._id === updatedCard._id);
    if (foundIndex !== -1) {
      setCards(state => [...state.slice(0, foundIndex), updatedCard, ...state.slice(foundIndex + 1)])
    }
    isLiked 
    ? setFavourites(state => state.filter(e => e._id !== updatedCard._id))
    : setFavourites(state => [updatedCard, ...state])
  }

  const productRate = (rewiews) => {
    if (!rewiews || rewiews.length) {
      return 0;
    }
    const result = rewiews.reduce((accum, el) => accum += el.rating, 0)
    return result / rewiews.length;
  }

  const onSort = (sortId) => {
    switch (sortId) {
      case 'popular':
        // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
        return setCards(cards => [...cards.filter(e => e.likes.length)]);
      case 'byRate':
        return setCards(cards => [...cards.sort((a, b) => productRate(b.rewiews) - productRate(a.rewiews))]);
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

  const findLiked = (product, userId) => {
    return product.likes.some(e => e === userId)
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProduct(debounceValueInApp)
    .then(data => setCards(filteredCards(data)))
    .catch(error => console.log(new Error(error.message)));
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()])
      .then(([userData, data]) => {
        setUser(userData);
        const filtered = filteredCards(data.products);
        setCards(filtered);

        const favourites = filtered.filter(e => findLiked(e, userData._id));
        setFavourites(favourites);
      })
      .catch(error => console.log(new Error(error.message)))
  }, []);

  const cardsValue = {
    handleLike: handleProductLike,
    cards,
    search,
    favourites,
    onSort,
    setModalActive,
  }

  // const authRoutes = <>
  //   <Route path="/singup" element={
  //     <Modal modalActive={modalActive} setModalActive={setModalActive}>
  //       <RegisterForm />
  //     </Modal>
  //   } />
  //   <Route path="/singin" element={
  //     <Modal modalActive={modalActive} setModalActive={setModalActive}>
  //       <AuthorizationForm />
  //     </Modal>
  //   } />
  // </>

  return (
    <div className="container">
        <CardContext.Provider value={cardsValue}>
        <UserContext.Provider value={user}>
          <Header setSearch={setSearch} />
          <section>
            {isAuthorized
            ? <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<CatalogPage />}/>
                <Route path="/product/:id" element={<ProductPage />}/>
                <Route path="/favourites" element={<FavouritesPage />}/>
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
              </Routes>
            : <Navigate to={'/not authorizated'} />}
          </section>
          <Footer />
        </UserContext.Provider>
        </CardContext.Provider>
      </div> 
  );
};

export default App;