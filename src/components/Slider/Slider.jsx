import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { sliderItems } from '../../data';
import './slider.css';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
    // position: relative;
`;

const Slide = styled.div`
    // height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    // background-color: ${(props) => props.bg};
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
            {/* <div className="hide-on-mobile"> */}
            <div className="grid ">
                <div className="row">
                    <div className="col l-12">
                        <div className="slider-container">
                            <div
                                className="button-arrow left"
                                onClick={() => handleClick('left')}
                            >
                                <ArrowLeftOutlined style={{ fontSize: '30px' }} />
                            </div>
                            <Wrapper slideIndex={slideIndex}>
                                {sliderItems.map((item) => (
                                    <Slide bg={item.bg} key={item.id}>
                                        <div className="img-container">
                                            {/* <Link to={`/products/${item.cat}`}> */}
                                            <Link to={`/products/${item.cat}?page=${1}`}>
                                                <link
                                                    rel="preload"
                                                    href={item.img}
                                                    as="image"
                                                />
                                                <link rel="prefetch" href={item.img} />
                                                <picture>
                                                    <source
                                                        srcSet={item.setSrc}
                                                        media="(max-width: 480px)"
                                                    />
                                                    <source
                                                        srcSet={item.img}
                                                        media="(min-width: 481px)"
                                                    />
                                                    <img
                                                        srcSet={item.img}
                                                        alt=""
                                                        className="img-item"
                                                    />
                                                </picture>
                                            </Link>
                                        </div>
                                    </Slide>
                                ))}
                            </Wrapper>

                            <div
                                className="button-arrow right"
                                onClick={() => handleClick('right')}
                            >
                                <ArrowRightOutlined style={{ fontSize: '30px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* 
            <div className="mobile-block-img">
                <img
                    src="https://file.hstatic.net/200000312481/file/z3949119209444_8fbde8be80833559e1e4ae7477cc13af_14b8c722c505407495bd2f3c98841131_large.jpg"
                    alt=""
                    className="mobile-img-slider"
                />
            </div> */}
        </div>
    );
};

export default Slider;
