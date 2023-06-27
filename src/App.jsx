import React, { useEffect } from "react";
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, setAuthorized } from "./store/slices/userSlice";
import { parseJwt} from "./tools/utils"; 
import { fetchGetProductList, fetchSearch } from "./store/slices/productsSlice";
import { fetchGetPostList, fetchSearchPosts } from "./store/slices/postsSlice";
import { useDebounce } from "./hooks/debounceValue";
import { useLocation } from "react-router-dom";
import { RouterAuth } from "./components/Router/RouterAuth";
import { RouterUnAuth } from "./components/Router/RouterUnAuth";

function App() {
  const {search} = useSelector(s => s.products);
  const {isAuthorized} = useSelector(s => s.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const debounceValueInApp = useDebounce(search);

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    
    if (location.pathname === "/catalog" ) {
      dispatch(fetchSearch(debounceValueInApp))
    } else if (location.pathname === "/news") {
      dispatch(fetchSearchPosts(debounceValueInApp))
    }
    
  }, [debounceValueInApp, dispatch]);


  useEffect(() => {
    dispatch(fetchGetUser())
      .then(() => dispatch(fetchGetProductList()))
      .then(() => dispatch(fetchGetPostList()))
  }, [dispatch])

  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'));
    const isCheckedDate = new Date() < new Date(token?.exp * 1e3);
    isCheckedDate ? dispatch(setAuthorized(true)) : dispatch(setAuthorized(false));
  }, [dispatch])
  
  return (
          <div className="container">
            <Header />
            <section>
              {isAuthorized ? <RouterAuth /> : <RouterUnAuth />}
            </section>
            <Footer />
          </div> 
  );
};

export default App;