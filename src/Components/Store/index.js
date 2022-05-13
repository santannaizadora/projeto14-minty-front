import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TokenContext from "../../contexts/TokenContext";

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
            console.log(typeof pageNumberInt)
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

    const PageButtons = () => {
        return (
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                <input
                    type="number"
                    placeholder={page}
                    min={1}
                    max={totalPages}
                    onKeyDown={handlePageChange}
                />
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Próxima</button>
            </div>
        )
    }

    const GameContainer = (props) => {
        console.log(props)
        const { key, title, price, thumbnail } = props;
        return (
            <GameContainer key={key}>
                <img src={thumbnail} alt={title} />
                <h3>{title}</h3>
                <p>{price}</p>
            </GameContainer>
        )
    }

    return (
        <Container>
            <h1>Store</h1>
            <PageButtons />
            {
                canRender
                &&
                gameInfo.map((game) => {
                    return (
                    <GameContainer
                        key={game._id}
                        title={game.title}
                        price={game.price}
                        thumbnail={game.thumbnail}
                    />
                    )
                })
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
    height: 100vh;
`;

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 170px;
    height: 199px;
    background: #1F1F1F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`
const gameImage = styled.img`
    width: 150px;
    height: 103px;
`