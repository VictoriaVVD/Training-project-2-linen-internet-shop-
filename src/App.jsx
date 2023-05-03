import React, { useContext, useEffect, useState } from "react";
import data from "./assets/data.json";
import './App.css';
import { Header } from './components/Header/Header';
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FavouritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { CardList } from "./components/CardList/CardList";
import { Footer } from './components/Footer/Footer';
import { api } from "./assets/api/api";
import { Routes, Route, Navigate } from "react-router";
import { UserContext } from "./context/userContext";
import { CardContext } from "./context/cardContext";


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
  
  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === "64416c303291d790b3fc22b3")
  }
  
  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, isLiked) => {
    const updatedCard = await api.toggleCardLike(product._id, isLiked);

    const foundedIndex = cards.findIndex(e => e._id === updatedCard._id);
    if (foundedIndex !== -1) {
      setCards(state => [...state.slice(0, foundedIndex), updatedCard, ...state.slice(foundedIndex + 1)])
    }
    isLiked 
    ? setFavourites(state => state.filter(e => e._id !== updatedCard._id))
    : setFavourites(state => [updatedCard, ...state])
  }

  const onSort = (sortId) => {
    let cardsSorted;
    switch (sortId) {
      case 'popular':
          // Реализовать очищение страницы для сортировки по другому признаку - т.е. вернуть все товары на страницу
          cardsSorted = cards.filter(e => e.likes.length)
          setCards([...cardsSorted])
        break;
        // case 'byRate':
        
        
        // break;
        case 'newProduct':
          
          cardsSorted = cards.filter(e => e.tags.includes('new'))
          setCards([...cardsSorted])
        break;
        case 'cheapFirst':
          
          cardsSorted = cards.sort((a, b) => b.price - a.price)
          setCards([...cardsSorted])
        break;
        case 'expensiveFirst':
          
          cardsSorted = cards.sort((a, b) => a.price - b.price)
          setCards([...cardsSorted])
        break;
        case 'sale':
        
          cardsSorted = cards.sort((a, b) => b.discount - a.discount)
          setCards([...cardsSorted])
        
        break;
    
      default:
        break;
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
  }

  return (
    <div className="container">
        <CardContext.Provider value={cardsValue}>
        <UserContext.Provider value={user}>
          <Header setSearch={setSearch} />
          <section>
            {isAuthorized
            ? <Routes>
                <Route path="/" element={<CatalogPage />}/>
                <Route path="/product/:id" element={<ProductPage />}/>
                <Route path="/favourites" element={<FavouritesPage />}/>
                <Route path="*" element={<div className="pageNotFound">Страница не найдена</div>}/>
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