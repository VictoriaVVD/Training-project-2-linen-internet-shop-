import React, { useEffect, useState } from "react";
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FavouritesPage } from "./pages/FavouritesPage/FavouritesPage";
import { Footer } from './components/Footer/Footer';
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
import { useDispatch } from "react-redux";
import { fetchGetUser } from "./store/slices/userSlice";
import { countRateNum} from "./store/utilsStore"; 
import { fetchGetProductList, fetchSearch } from "./store/slices/productsSlice";
import { fetchGetPostList } from "./store/slices/postsSlice";
import { useDebounce } from "./hooks/debounceValue";
import { About } from "./components/Companie`sInfo/About";
import { AboutDelivery } from "./components/Companie`sInfo/AboutDelivery";
import { Contacts } from "./components/Companie`sInfo/Contacts";
import { FAQ } from "./components/Companie`sInfo/FAQ";
import { Feedback } from "./components/Companie`sInfo/Feedback";


function App() {

  const [search, setSearch] = useState(undefined);
  const [isAuthorized, setAuthorized] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  
  const debounceValueInApp = useDebounce(search);

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    dispatch(fetchSearch(debounceValueInApp))
  }, [debounceValueInApp, dispatch]);

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
                <Route path="/delivery" element={<AboutDelivery />} />
                <Route path="/about" element={<FAQ />} />
                {/* <Route path="/about" element={<Contacts />} /> */}
                <Route path="/about" element={<Feedback />} />
                "/delivery"
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