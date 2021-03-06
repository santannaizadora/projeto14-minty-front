import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TokenContext from "../../contexts/TokenContext";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import GameSwiper from "./GamesSwiper";

export default function Store() {
    const { token } = useContext(TokenContext);
    const [gameInfo, setGameInfo] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [canRender, setCanRender] = useState(false);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}store?page=${page}`, config)
            .then((response) => {
                setGameInfo(response.data.games)
                setTotalPages(response.data.pageCount)
                setCanRender(true)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [page])

    const handlePageChange = (e) => {
        if (e.key === 'Enter') {
            let pageNumber = e.target.value;
            let pageNumberInt = parseInt(pageNumber);
            if (pageNumberInt > 0 && pageNumberInt <= totalPages) {
                setCanRender(false)
                setPage(pageNumberInt)
                e.target.value = ''
            } else if (pageNumberInt > totalPages && page !== totalPages) {
                setCanRender(false)
                setPage(totalPages)
                e.target.value = ''
            } else if (pageNumberInt < 1 && page !== 1) {
                setCanRender(false)
                setPage(1)
                e.target.value = ''
            } else {
                e.target.value = ''
            }
        }
    }

    const handlePageClick = (e) => {
        const gameContainer = document.getElementById('game-container');
        gameContainer.scrollTo(0, 0);
        setCanRender(false)
    }


    const PageButtons = () => {
        return (
            <ButtonsContainer>
                <button onClick={() => {
                    handlePageClick()
                    setPage(page - 1)
                }} disabled={page === 1}>Anterior</button>
                <input
                    type="number"
                    placeholder={page}
                    min={1}
                    max={totalPages}
                    onKeyDown={handlePageChange}
                />
                <button onClick={() => {
                    handlePageClick()
                    setPage(page + 1)
                }

                } disabled={page === totalPages}>Pr??xima</button>
            </ButtonsContainer>
        )
    }

    const GameContainer = () => {
        return gameInfo.map((game) => {
            const { title, price, thumbnail, _id } = game;
            return (
                <Link to={`/game/${_id}`} key={_id}>
                    <Game key={_id}>
                        <img src={thumbnail} alt={title} />
                        <h3>{title}</h3>
                        <p>R$ {price.toFixed(2).toString().replace(".", ",")}</p>
                    </Game>
                </Link>
            )
        })
    }


    const pageTitleNews = page === 1 ? <p className="title">Novidades</p> : <></>;
    const gameSlides = page === 1 ? <GameSwiper config={config} /> : <></>;
    const pageTitleGames = page === 1 ? <p className="title">Jogos</p> : <></>;

    return (
        <Container>
            {canRender
                ? <GameGrid id="game-container" >
                    {pageTitleNews}
                    {gameSlides}
                    {pageTitleGames}
                    <GameContainer />
                </GameGrid>
                : <Loading>
                    <ThreeDots color="#FFF" height={50} width={50} />
                </Loading>

            }
            <PageButtons />
        </Container>
    );
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    color: #fff;
    width: 100%;
    min-height: 100vh;
    z-index: 0;

    .title{
        width: 100%;
        padding-left: 18px;
        font-family: var(--main-font);
        font-weight: 900;
        font-size: 24px;
        color: var(--secondary-color);
        margin-bottom: 9px
    }
    
 
`;

const Game = styled.div`
    display: flex;
    flex-direction: column;
    width: 170px;
    height: 199px;
    background: #1F1F1F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin-bottom: 15px;
    position: relative;

    img {
        width: 160px;
        align-self: center;
        margin-top: 5px;
    }

    h3 {
        font-size: 24px;
        font-family: var(--main-font);
        padding-top: 15px;
        padding-left: 10px;
    }

    p {
        font-size: 15px;
        font-family: var(--main-font);
        position: absolute;
        bottom: 10px;
        right: 10px;

    }
    
`
const GameGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    height: calc(100vh - 60px);
    flex-wrap: wrap;
    overflow-y: auto;
    padding-top: 70px;

    a {
        text-decoration: none;
        color: #fff;
    }

    ::-webkit-scrollbar{
        width: 0;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 250px;
    margin: 15px 0;
    position: fixed;
    bottom: 0; 

    button {
        background-color: #2F2F2F;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 16px;
        font-family: var(--main-font);
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease-in-out;

        &:disabled {
            background-color: #1F1F1F;
            cursor: not-allowed;
        }
    }

    input {
        width: 50px;
        height: 30px;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 16px;
        font-family: var(--main-font);
        outline: none;
        transition: all 0.2s ease-in-out;
        text-align: center;
    }
`
const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px);
    width: 100%;
    background-color: #121212;
    color: #fff;
    font-size: 30px;
    font-family: var(--main-font);
`