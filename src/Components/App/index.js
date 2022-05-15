import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TokenContext from "../../contexts/TokenContext";
import { useState } from "react";

import Login from '../Login';
import SignUp from "../SignUp"
import Store from "../Store";
import Cart from "../Cart";
import Game from "../Game";
import Checkout from "../Checkout";



export default function App() {

    const [token, setToken] = useState("");
    if (token === "" && localStorage.getItem("token") !== null) {
        setToken(localStorage.getItem("token"));
    }

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/game/:id" element={<Game />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>

    );
}