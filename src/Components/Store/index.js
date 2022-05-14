import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TokenContext from "../../contexts/TokenContext";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

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
        axios.get(`http://localhost:5000/store?page=${page}`, config)
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
            } if (pageNumberInt > totalPages) {
                setCanRender(false)
                setPage(totalPages)
                e.target.value = ''
            }
            if (pageNumberInt < 1) {
                setCanRender(false)
                setPage(1)
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

                } disabled={page === totalPages}>Próxima</button>
            </ButtonsContainer>
        )
    }

    const GameContainer = (props) => {
        const { title, price, thumbnail } = props;
        return (
            <Game>
                <img src={thumbnail} alt={title} />
                <h3>{title}</h3>
                <p>R$ {price.toString().replace(".", ",")}</p>
            </Game>
        )
    }

    console.log(gameInfo)

    return (
        <Container>
            {
                canRender ?
                    <GameGrid id="game-container">
                        {
                            gameInfo.map((game) => {
                                return (
                                    <Link to={`/game/${game._id}`} key={game.id}>
                                    <GameContainer 
                                        title={game.title}
                                        price={game.price}
                                        thumbnail={game.thumbnail}
                                    />
                                    </Link>
                                )
                            })
                        }
                    </GameGrid>
                    :
                    <Loading>
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
        padding-left: 10px;
        position: absolute;
        bottom: 10px;

    }
`
const GameGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    height: 600px;
    flex-wrap: wrap;
    overflow-y: auto;
    padding-top: 70px;

    a {
        text-decoration: none;
        color: #fff;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 250px;
    margin-top: 15px;

    button {
        background-color: #1F1F1F;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 16px;
        font-family: var(--main-font);
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: #2F2F2F;
        }

        &:disabled {
            background-color: #2F2F2F;
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
    height: 600px;
    width: 100%;
    background-color: #121212;
    color: #fff;
    font-size: 30px;
    font-family: var(--main-font);
`