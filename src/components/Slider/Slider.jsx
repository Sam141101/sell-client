import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './slider.css';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`;

const Slide = styled.div`
    // height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
`;

const Slider = ({ slides }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex((currentSlideIndex) =>
                currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1,
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    const handleClickPrevious = () => {
        setCurrentSlideIndex((currentSlideIndex) =>
            currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1,
        );
    };

    const handleClickNext = () => {
        setCurrentSlideIndex((currentSlideIndex) =>
            currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1,
        );
    };

    return (
        <div className="fullscreen-slider">
            <div className="slide-nav left">
                <div
                    className="button-arrow bd50pt df ai jc left"
                    onClick={handleClickPrevious}
                >
                    <ArrowLeftOutlined className="icon-btn" />
                </div>
            </div>
            <div className="slide-nav right">
                <div
                    className="button-arrow bd50pt df ai jc right"
                    onClick={handleClickNext}
                >
                    <ArrowRightOutlined className="icon-btn" />
                </div>
            </div>
            <div className="slider-container df">
                <Wrapper slideIndex={currentSlideIndex}>
                    {slides.map((slide, index) => (
                        <Slide bg={slide.bg} key={index}>
                            <div className="img-container">
                                <Link
                                    to={`/products/${slide.cat}?page=${1}`}
                                    aria-label="See more about tee"
                                >
                                    <link rel="preload" href={slide.img} as="image" />
                                    <link rel="preload" href={slide.setSrc} as="image" />
                                    {/* <link rel="prefetch" href={slide.img} /> */}
                                    <picture>
                                        <source
                                            srcSet={slide.setSrc}
                                            media="(max-width: 480px)"
                                        />
                                        <source
                                            srcSet={slide.img}
                                            media="(min-width: 481px)"
                                        />
                                        <img
                                            srcSet={slide.img}
                                            alt=""
                                            className="img-item"
                                            // width="1536px"
                                            // height="768px"
                                        />
                                    </picture>
                                </Link>
                            </div>
                        </Slide>
                    ))}
                </Wrapper>
            </div>
        </div>
    );
};

export default Slider;
