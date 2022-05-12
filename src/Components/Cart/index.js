import styled from "styled-components";


export default function Cart() {
    return (
        <Container>
            <h1>Meu carrinho</h1>
            <DivCart>
                <div>
                    <Product>
                        <Thumbnail src="https://www.freetogame.com/g/1/thumbnail.jpg" />
                        <div>
                            <Title>CRSED: F.O.A.D.</Title>
                            <Price>R$ 25,45</Price>
                        </div>
                        <ion-icon name="close"></ion-icon>
                    </Product>
                </div>
            </DivCart>
            <DivInfo>
                <hr />
                <Total>
                    <p>Subtotal</p>
                    <p>R$ 80,45</p>
                </Total>
                <hr />
                <DivButton>
                    <button>Finalizar carrinho</button>
                </DivButton>
            </DivInfo>
        </Container>
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

    background-color: var(--background-color)
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