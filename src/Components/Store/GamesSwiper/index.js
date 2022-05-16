import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import "swiper/modules/navigation/navigation.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function GameSwiper(props) {
    const { config } = props

    const [recentGames, setRecentGames] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}store/news`, config)
            .then((response) => {
                setRecentGames(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    const isNotEmpty = Object.keys(recentGames).length > 0 ? true : false;
    return (
        <DivSwiper>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper">

                {isNotEmpty ?
                    recentGames?.map((game) => {
                        const { _id, thumbnail, title } = game
                        return (
                            <SwiperSlide key={_id} onClick={() => navigate(`/game/${_id}`)}>
                                <img src={thumbnail} alt={title} />
                                <p className='text-swiper'>{title}</p>
                            </SwiperSlide>
                        )
                    })
                    : <></>
                }
            </Swiper>
        </DivSwiper>
    )

}


const DivSwiper = styled.div` 
    margin-bottom: 16px;
    width: 100vw;
    display: flex;
    justify-content: center;
    height: 194px;


    .swiper {
        width: 344px;
        height: 194px;
        --swiper-pagination-bullet-width: 5px;
        --swiper-pagination-bullet-height: 5px;
        --swiper-navigation-size: 20px;
        

        .text-swiper{    
            width: 150px;
            font-family: var(--main-font);
            font-weight: 400;
            font-size: 25px;
            position: absolute;
            bottom: 20px;
            left: 16px;
            text-align: left;
        }

    }

    .swiper-pagination-bullet{
        background-color: white;
    }



    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: var(--main-color);
        border-radius: 5px;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        opacity: 0.4;
    }

    .swiper-button-prev,
    .swiper-button-next{
        color: white;
    }


`