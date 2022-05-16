import axios from "axios";
import { useState, useContext, useEffect } from "react";
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
    const [badgeNumber, setBadgeNumber] = useState(0)
    const navigate = useNavigate()

    const { token, setToken } = useContext(TokenContext)

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
        axios.get(`${process.env.REACT_APP_API_URL}search/${search}`, config)
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


    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}cart/number`, config)
            .then((response) => {
                setBadgeNumber(response.data.length)
            })
            .catch((e) => {
                console.log(e);
            })
    }, [refresh])

    const toolbar = (
        <DivToolbar>
            <DivSearch onSubmit={searchValidate}>
                <ion-icon name="search"></ion-icon>
                <input placeholder="Pesquisar" type="text" value={search} required onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" ></button>
            </DivSearch>
            <div>
                <DivCart>
                    <ion-icon name="storefront" onClick={() => navigate("/store")} ></ion-icon>
                    <ion-icon name="cart" onClick={() => navigate("/cart")}></ion-icon>
                    {badgeNumber <= 0
                        ? <></>
                        : <ion-badge className="cart-badge" color="danger">{badgeNumber}</ion-badge>}
                    <ion-icon name="person" onClick={() => navigate("/user")}></ion-icon>
                    <ion-icon name="log-out-outline"
                        onClick={() => {
                            window.confirm("Deseja realmente sair?") && handleLogout()
                        }}></ion-icon>
                </DivCart>
            </div>
        </DivToolbar >
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

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;

        ion-icon{
            margin-left: 10px;
        }
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
    position: relative;
 
    ion-icon{
        font-size: 24px;
        color: var(--secondary-color);

        
    }
    
    ion-badge{
        width: 15px;
        height: 15px;

        display: flex;
        justify-content: center;
        align-items: center;


        font-family: var(--main-font);
        font-weight: 700;
        font-size: 13px;
        color: white;
        background-color: #ec5353;
        position: absolute;
        top: -3px;
        right: -3px;
        border-radius: 100%;
    }
`
