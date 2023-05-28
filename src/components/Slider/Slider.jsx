import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { sliderItems } from '../../data';
import './slider.css';

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #c7c3c3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === 'left' && '10px'};
    right: ${(props) => props.direction === 'right' && '10px'};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`;

const Slide = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.bg};
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else if (direction === 'right') {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <div className="slider-top-mobile">
            <div className="hide-on-mobile">
                <div className="grid ">
                    <div className="row">
                        <div className="col l-12">
                            <div className="slider-container">
                                <Arrow
                                    direction="left"
                                    onClick={() => handleClick('left')}
                                >
                                    <ArrowLeftOutlined />
                                </Arrow>

                                <Wrapper slideIndex={slideIndex}>
                                    {sliderItems.map((item) => (
                                        <Slide bg={item.bg} key={item.id}>
                                            <div className="img-container">
                                                {/* <Link to={`/products/${item.cat}`}> */}
                                                <Link
                                                    to={`/products/${item.cat}?page=${1}`}
                                                >
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                        className="img-item"
                                                    />
                                                </Link>
                                            </div>
                                        </Slide>
                                    ))}
                                </Wrapper>

                                <Arrow
                                    direction="right"
                                    onClick={() => handleClick('right')}
                                >
                                    <ArrowRightOutlined />
                                </Arrow>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-block-img">
                <img
                    src="https://file.hstatic.net/200000312481/file/z3949119209444_8fbde8be80833559e1e4ae7477cc13af_14b8c722c505407495bd2f3c98841131_large.jpg"
                    alt=""
                    className="mobile-img-slider"
                />
            </div>
        </div>
    );
};

export default Slider;
