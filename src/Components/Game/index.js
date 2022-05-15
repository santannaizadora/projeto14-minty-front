import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";


import TokenContext from "../../contexts/TokenContext";
import SearchContext from "../../contexts/SearchContext";
import toastConfig from "../../assets/toastify/toastConfig";

export default function Game() {
    const { id } = useParams()

    const { token } = useContext(TokenContext);
    const { refresh } = useContext(SearchContext);

    const [gameInfo, setGameInfo] = useState({});
    const { price, thumbnail, title, short_description } = gameInfo

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    function formatPrice(price) {
        return `${price}`.replace(".", ",")
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/game/${id}`, config)
            .then((response) => {
                setGameInfo(response.data)
            })
            .catch((error) => {
                toast.error(error.response.data, toastConfig);
                console.log(error);
            })
    }, [refresh])

    function addCart() {
        axios.post(`http://localhost:5000/cart/${id}`, null, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                toast.error(error.response.data, toastConfig);
                console.log(error);
            })
    }

    return (
        <Container>
            <DivGame>
                <h1>{title}</h1>
                <div>
                    <img src={thumbnail} alt="Game thumbnail" />
                    <Price>R$ {formatPrice(price)} </Price>
                    <hr />
                    <ButtonCart onClick={addCart}>Adicionar ao carrinho</ButtonCart>
                    <hr />
                    <Description>
                        <p>{short_description}</p>
                    </Description>
                </div>
            </DivGame>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--background-color);

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 89px 14px 25px 14px;

    *{
        font-family: 'Truculenta';
    }
`

const DivGame = styled.div`
    width: 347px;
    height: 553px;
    background-color: var(--main-color);
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 19px 12px 9px 12px;
    
    h1{
        font-style: normal;
        font-weight: 400;
        font-size: 29px;
        color: white;
        margin-bottom: 14px;
    }

    div{
        display: flex;
        flex-direction: column;
        align-items: center;

        hr{
            width: 100%;
            border-color: #808080;
            margin: 0;
            margin-bottom: 14px;
        }
    }

    img{
        width: 321px;
        height: 197px;
        margin-bottom: 14px;
        border-radius: 4px;
    }

    p{
        color: white;
        font-style: normal;
        font-weight: 400;   
    }

`

const Price = styled.p`
    font-size: 32px;
    margin-bottom: 7px;
`

const Description = styled.div`
    font-size: 24px;
    line-height: 30px;
`

const ButtonCart = styled.button`
    width:326px;
    height: 46px;
    
    background-color: var(--secondary-color);
    border: none;
    outline: none;
    border-radius: 5px;

    color: white;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;

    margin-bottom: 14px;
`