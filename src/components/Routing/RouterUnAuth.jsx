import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { About } from "../Companie`sInfo/About";
import { AboutDelivery } from "../Companie`sInfo/AboutDelivery";
import { Feedback } from "../Companie`sInfo/Feedback";
import { FAQ } from "../Companie`sInfo/FAQ";
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";


export const RouterUnAuth = () => {
    
    return (
            <>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/delivery" element={<AboutDelivery />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </> 
    )
}