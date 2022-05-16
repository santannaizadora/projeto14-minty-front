import styled from "styled-components"
import axios from "axios"
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState, useContext } from "react"
import TokenContext from "../../contexts/TokenContext";

export default function User() {
    const { token } = useContext(TokenContext)
    const [jogo, setJogo] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}userGames`, config)
            .then((response) => {
                setJogo(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }, [])

    return (
        <Container>
            <h1>Meus jogos</h1>
            {isLoading
                ? <InfinitySpin color="grey" />
                : <>
                    {jogo.map((item) => {
                        const { title, thumbnail, price, _id } = item;
                        return (
                            <Product key={_id}>
                                <Thumbnail src={thumbnail} />
                                <Title>{title}</Title>
                            </Product>
                        )
                    })}
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 15px 0 15px;
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
        width: 100%;
    }
`

const Product = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 5px;
    width: 347px;
    height: 77px;
    background: #1F1F1F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin-bottom: 15px;
    `

const Thumbnail = styled.img`
    height: 60px;
    border-radius: 4px;
    margin-right: 15px;
`
const Title = styled.p`
    font-size: 24px;
    font-weight: 700;
`
