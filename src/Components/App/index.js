import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from "react-toastify";
import TokenContext from "../../contexts/TokenContext";
import { useState } from "react";

import Login from '../Login';
import SignUp from "../SignUp"


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
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>

    );
}