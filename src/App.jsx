import React, { useEffect, useState } from "react";
import data from "./assets/data.json";
import './App.css';
import { Header } from './components/Header/Header';
import CardList from './components/CardList/CardList';
import Footer from './components/Footer/Footer';
import { api } from "./assets/api/api";

const useDebounce = (path) => {
  const [debounceValue, setDebounceValue] = useState(path);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path)
  }, 1000);
      return () => clearTimeout(timeout)
  }, [path]); 
  
      return debounceValue;
}

function App() {
  
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState([]);
  const filteredCards = (cards) => {
    return cards.filter(e => e.author._id === "64416c303291d790b3fc22b3")
  };
  const debounceValueInApp = useDebounce(search);
  const handleProductLike = async (product, isLiked) => {
    const updatedCard = await api.toggleCardLike(product._id, isLiked);
    const foundedIndex = cards.findIndex(e => e._id === updatedCard._id);
    if (foundedIndex !== -1) {
      setCards(state => [...state.slice(0, foundedIndex), updatedCard, ...state.slice(foundedIndex + 1)])
    }
  }

  useEffect(() => {
    api.getProductList()
    .then(data => {console.log(data.products);setCards(data.products)}
    );
  }, []);

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProduct(debounceValueInApp)
    .then(data => setCards(filteredCards(data))
    );
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()])
    .then(([userData, data]) => {
      setUser(userData);
      setCards(filteredCards(data.products));
    })
  }, []);

  return (
    <div className="container">
      <Header setSearch={setSearch} />
      <CardList cards={cards} userId={user._id} handleLike={handleProductLike} />
      <Footer />
    </div> 
  );
};

export default App;