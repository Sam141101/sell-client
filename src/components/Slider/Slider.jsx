import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { sliderItems } from '../../data';
import { mobile } from '../../responsive';
import './slider.css';

const Container = styled.div`
    width: 100%;
    // height: 100vh;
    height: 80vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
        display: 'none',
    })}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
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
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
`;

const Image = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px 50px 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    font-size: 20px;
    margin: 50px 0px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    font-size: 20px;
    padding: 10px 12px;
    cursor: pointer;
    background-color: transparent;
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
                                        // <Slide bg={item.bg} key={item.id}>
                                        //     <ImgContainer>
                                        //         <Image src={item.img} />
                                        //     </ImgContainer>

                                        //     <InfoContainer>
                                        //         <Title>{item.title}</Title>
                                        //         <Desc>{item.desc}</Desc>
                                        //         <Link
                                        //             to={`/products/${item.cat}`}
                                        //             style={{ textDecoration: 'none' }}
                                        //         >
                                        //             <Button>XEM NGAY</Button>
                                        //         </Link>
                                        //     </InfoContainer>
                                        // </Slide>

                                        <Slide bg={item.bg} key={item.id}>
                                            {/* <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer> */}
                                            {/* <div className="col l-12"> */}
                                            <div className="img-container">
                                                <img
                                                    src={item.img}
                                                    alt=""
                                                    className="img-item"
                                                />
                                            </div>
                                            {/* </div> */}

                                            {/* <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Link
                                to={`/products/${item.cat}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button>XEM NGAY</Button>
                            </Link>
                        </InfoContainer> */}
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
