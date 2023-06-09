import React from "react";
import { Route, Routes } from "react-router-dom";
import { PromoPage } from "../../pages/PromoPage/PromoPage";
import { HomePage } from "../../pages/HomePage/HomePage";
import { CatalogPage } from "../../pages/CatalogPage/CatalogPage";
import { ProductPage } from "../../pages/ProductPage/ProductPage";
import { FavouritesPage } from "../../pages/FavouritesPage/FavouritesPage";
import { CartPage } from "../../pages/CartPage/CartPage";
import { UserProfilePage } from "../../pages/UserProfilePage/UserProfilePage";
import { NewsPage } from "../../pages/NewsPage/NewsPage";
import { PostPage } from "../../pages/PostPage/PostPage";
import { About } from "../Companie`sInfo/About";
import { AboutDelivery } from "../Companie`sInfo/AboutDelivery";
import { FAQ } from "../Companie`sInfo/FAQ";
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";
import { AuthorPage } from "../../pages/AuthorPage/AuthorPage";
import { Feedback } from "../Companie`sInfo/Feedback";


export const RouterAuth = () => {
    
    return (
            <>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/promo" element={<PromoPage />}/>
                    <Route path="/catalog" element={<CatalogPage />}/>
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/favourites" element={<FavouritesPage />}/>
                    <Route path="/cart" element={<CartPage />}/>
                    <Route path="/profile" element={<UserProfilePage />}/>
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/author/:name" element={<AuthorPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/delivery" element={<AboutDelivery />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </> 
    )
}


