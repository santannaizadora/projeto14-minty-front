import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InfinitySpin } from "react-loader-spinner";

import TokenContext from "../../contexts/TokenContext";

export default function Cart() {

    const navigate = useNavigate();
    const [cart, setCart] = useState({})
    const [refresh, setRefresh] = useState(false);


    const { token } = useContext(TokenContext)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/cart', config)
            .then((response) => {
                setCart(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh])


    function deleteGame(id) {
        axios.delete(`http://localhost:5000/cart/${id}`, config)
            .then((response) => {
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const newPrice = (price) => `${price}`.replace(".", ",");
    const loading = <Loading><InfinitySpin color="grey" /></Loading>
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
            {Object.keys.length > 0
                ? <DivCart>
                    <div>
                        {cartHTML}
                    </div>
                </DivCart>
                : loading
            }
            <DivInfo>
                <hr />
                <Total>
                    <p>Subtotal</p>
                    {Object.keys.length > 0
                        ? <p>R$ {newPrice(cart.total)}</p>
                        : <p>R$ 0,00</p>
                    }
                </Total>
                <hr />
                <DivButton>
                    <button onClick={() => navigate("/checkout")}>Finalizar carrinho</button>
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

const Loading = styled.div`
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-color);

`