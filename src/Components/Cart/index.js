import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { InfinitySpin } from "react-loader-spinner";

import TokenContext from "../../contexts/TokenContext";
import SearchContext from "../../contexts/SearchContext";


export default function Cart() {

    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(false);

    const { token } = useContext(TokenContext);
    const { refresh: refrashSearch, setRefresh: setRefrashSearch } = useContext(SearchContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}cart`, config)
            .then((response) => {
                setCart(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }, [refresh])


    function deleteGame(id) {
        axios.delete(`${process.env.REACT_APP_API_URL}cart/${id}`, config)
            .then((response) => {
                setRefresh(!refresh);
                setIsLoading(true)
                setRefrashSearch(!refrashSearch)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const isCartEmpty = cart?.userCart?.length <= 0 ? true : false;
    const newPrice = (price) => `${price}`.replace(".", ",");
    const loading = <NotFound><InfinitySpin color="grey" /></NotFound>
    const cartHTML = cart.userCart?.map((item) => {
        const { title, thumbnail, price, _id } = item;
        return (
            <Product key={_id}>
                <Thumbnail src={thumbnail} />
                <div>
                    <Title>{title}</Title>
                    <Price>R$ {newPrice(price)}</Price>
                </div>
                <ion-icon name="close" onClick={() => deleteGame(_id)}></ion-icon>
            </Product>
        )
    })

    return (
        <Container>
            <h1>Meu carrinho</h1>
            {isLoading
                ? loading
                : <DivCart>
                    <div>
                        {isCartEmpty
                            ?
                            <>
                                <NotFound> Seu carrinho está vazio
                                    <br /><Link to="/store" >Clique aqui para ir para a loja</Link>
                                </NotFound>

                            </>
                            : cartHTML
                        }
                    </div>
                </DivCart>
            }
            <DivInfo>
                <hr />
                <Total>
                    <p>Subtotal</p>
                    {isCartEmpty
                        ? <p>R$ 0,00</p>
                        : <p>R$ {newPrice(cart.total)}</p>
                    }
                </Total>
                <hr />
                <DivButton>
                    <button disabled={isCartEmpty} onClick={() => navigate("/checkout")}>Finalizar carrinho</button>
                </DivButton>
            </DivInfo>
        </Container >
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: var(--background-color);


    padding: 67px 18px 0 10px;
    
    h1{ 
        font-size: 24px;
        font-weight: 900;
        color: var(--secondary-color);
        margin-bottom: 15px;
    }
    
    hr{
        border-color: #808080;
    }

    *{
        font-family: var(--main-font);
    }

`

const DivCart = styled.div` 
    height: 420px;
    display: flex;
    flex-direction: column;
    
    overflow-y: scroll;

    ::-webkit-scrollbar {
    display: none;
    }

`


const Product = styled.div` 
    height: 77px;

    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    background-color: var(--main-color);
    margin-bottom: 4px;
    color: white;

    div{
        margin-left: 10px;
    }

    ion-icon{
        position: absolute;
        right: 10px;
        top: 10px;
        color: #736E6E;
    }

`
const Title = styled.p`
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
`
const Price = styled.p`
    font-weight: 400;
    font-size: 32px;
`

const Thumbnail = styled.img`
    height: 60px;
    border-radius: 4px;
`

const DivInfo = styled.div`
    width: 100vw;
    position: fixed;
    padding: 0 18px 22px 10px;

    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: var(--background-color);
`


const Total = styled.div` 
    font-weight: 700;
    color: white;
    display: flex;
    justify-content: space-between;

   
`

const DivButton = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    button{
        width: 326px;
        height: 46px;

        background-color: var(--secondary-color);
        border: none;
        outline: none;
        border-radius: 5px;

        font-weight: 400;
        font-size: 24px;
        color: white;
        
        margin-top: 15px;
    }
`

const NotFound = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    color:  #808080 ;
    background-color: var(--background-color);

    a{  
        color: var(--secondary-color);
        text-decoration: none;
    }

`