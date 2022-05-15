import styled from "styled-components"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import TokenContext from "../../contexts/TokenContext"
import { toast } from "react-toastify"

export default function Checkout() {
    const [cart, setCart] = useState(0)
    const [payment, setPayment] = useState('')
    console.log(payment)

    const { token } = useContext(TokenContext)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/checkout', config)
            .then((response) => {
                setCart(parseFloat(response.data.total))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const navigate = useNavigate()

    const Payment = () => {
        return (
            <>
                <Info style={{ boxShadow: payment === 'cartao' ? 'inset 0px 0px 0px 5px var(--secondary-color)' : 'none' }}
                    onClick={() => {
                        setPayment('cartao')
                    }}>
                    <div>
                        <ion-icon name="card-outline"></ion-icon>
                        <h2>Cartão de crédito</h2>
                    </div>
                </Info>
                <Info style={{ boxShadow: payment === 'boleto' ? 'inset 0px 0px 0px 5px var(--secondary-color)' : 'none' }}
                    onClick={() => {
                        setPayment('boleto')
                    }}>
                    <div>
                        <ion-icon name="cash-outline"></ion-icon>
                        <h2>Boleto</h2>
                    </div>
                </Info>
            </>
        )
    }

    const handleClick = () => {
        if (payment === '') {
            toast.error('Selecione um método de pagamento')
        } else {
            axios.post('http://localhost:5000/checkout', { payment }, config)
                .then((response) => {
                    toast.success('Compra realizada com sucesso')
                    navigate('/store')
                })
                .catch((error) => {
                    toast.error(error.response.data)
                })
        }
    }



    return (
        <Container>
            <h1>Finalizar carrinho</h1>
            <Info>
                <h2>Carrinho:</h2>
                <p>R$ {cart}</p>
            </Info>
            <h2>Forma de pagamento:</h2>
            <Payment />
            <DivInfo>
                <hr />
                <Total>
                    <p>Subtotal</p>
                    <p>R$ {cart.toFixed(2).toString().replace('.', ',')}</p>
                </Total>
                <hr />
                <DivButton>
                    <button
                        onClick={handleClick}
                    >Confirmar compra</button>
                </DivButton>
            </DivInfo>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 15px 0 15px;
    background-color: #121212;
    color: #fff;
    width: 100%;
    min-height: 100vh;
    font-family: var(--main-font);

    h1{
        font-size: 24px;
        font-weight: 900;
        color: var(--secondary-color);
        margin-bottom: 15px;
    }

    hr{
        border-color: #808080;
    }

    h2{
        font-size: 24px;
        font-weight: 700;
        padding: 15px 0;
    }
`;

const Info = styled.div`
    display: flex;
    width: 347px;
    height: 77px;
    background: #1F1F1F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
    border: ${props => props.selected ? '5px solid var(--secondary-color)' : 'none'};
    
    p{
        font-size: 32px;
    }

    ion-icon{
        font-size: 45px;
        padding-right: 15px;
    }

    div{
        display: flex;
        align-items: center;
    }

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
        font-family: var(--main-font);
        font-size: 24px;
        color: white;
        margin-top: 15px;
    }
`