import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import toastConfig from "../../assets/toastify/toastConfig";
import SearchContext from "../../contexts/SearchContext";
import TokenContext from "../../contexts/TokenContext";


export default function Toolbar() {
    const { pathname } = useLocation()

    const { refresh, setRefresh } = useContext(SearchContext);

    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    const { token } = useContext(TokenContext)

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function searchValidate(e) {
        e.preventDefault();
        if (search.trim() === "") {
            setSearch("");
            return toast.warn("Pesquisa vazia", toastConfig);
        }
        else searchData();
    }

    function searchData() {
        axios.get(`http://localhost:5000/search/${search}`, config)
            .then((response) => {
                navigate(`/game/${response.data}`);
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.log(error);
                toast.warn(error.response.data, toastConfig);
            })
        setSearch("");
    }


    const toolbar = (
        <DivToolbar>
            <DivSearch onSubmit={searchValidate}>
                <ion-icon name="search"></ion-icon>
                <input placeholder="Pesquisar" type="text" value={search} required onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" ></button>
            </DivSearch>
            <DivCart>
                <ion-icon name="cart" onClick={() => navigate("/cart")}></ion-icon>
            </DivCart>
        </DivToolbar>
    )

    if (pathname === "/" || pathname === "/signUp") return null;
    else return toolbar;

}

const DivToolbar = styled.div` 
    width: 100vw;
    height: 67px;

    position: fixed;
    top:0;
    left:0;
    z-index: 2;
    
    display:flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 20px;

    background-color: var(--background-color);

    *{
        font-family: var(--main-font);
    }

   
`

const DivSearch = styled.form`
    width: 219px;
    height: 30px;

    display: flex;
    align-items: center;

    border-radius: 5px;
    background-color: black;

    padding: 0 7px;
    
    ion-icon{
        font-size: 22px;
        color: var(--secondary-color);
        margin-right: 5px;
    }
    
    input{
        width: 100%;
        height:29px;

        background-color: black;
        outline: none;
        border: none;

        font-size: 20px;
        color: #868686;


        ::placeholder{
            color: #868686;
        }
    }

    button{
        display: none;
    }

`

const DivCart = styled.div` 

 ion-icon{
        font-size: 24px;
        color: var(--secondary-color);
    }

`