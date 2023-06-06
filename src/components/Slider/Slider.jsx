import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import { sliderItems } from '../../data';
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

const Slider = ({ slides }) => {
    // const [slideIndex, setSlideIndex] = useState(0);

    // const handleClick = (direction) => {
    //     if (direction === 'left') {
    //         setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    //     } else if (direction === 'right') {
    //         setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    //     }
    // };

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
                <div className="button-arrow left" onClick={handleClickPrevious}>
                    <ArrowLeftOutlined className="icon-btn" />
                </div>
            </div>
            <div className="slide-nav right">
                <div className="button-arrow right" onClick={handleClickNext}>
                    <ArrowRightOutlined className="icon-btn" />
                </div>
            </div>
            <div className="slider-container">
                <Wrapper slideIndex={currentSlideIndex}>
                    {slides.map((slide, index) => (
                        <Slide bg={slide.bg} key={index}>
                            <div className="img-container">
                                <Link to={`/products/${slide.cat}?page=${1}`}>
                                    <link rel="preload" href={slide.img} as="image" />
                                    <link rel="prefetch" href={slide.img} />
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

        // <div className="slider-top-mobile">
        //     {/* <div className="hide-on-mobile"> */}
        //     <div className="grid ">
        //         <div className="row">
        //             <div className="col l-12">
        //                 <div className="slider-container">
        //                     <div
        //                         className="button-arrow left"
        //                         onClick={() => handleClick('left')}
        //                     >
        //                         <ArrowLeftOutlined style={{ fontSize: '30px' }} />
        //                     </div>
        //                     {/* <Wrapper slideIndex={slideIndex}>
        //                         {sliderItems.map((item) => (
        //                             <Slide bg={item.bg} key={item.id}>
        //                                 <div className="img-container">
        //                                     <Link to={`/products/${item.cat}?page=${1}`}>
        //                                         <link
        //                                             rel="preload"
        //                                             href={item.img}
        //                                             as="image"
        //                                         />
        //                                         <link rel="prefetch" href={item.img} />
        // <picture>
        //     <source
        //         srcSet={item.setSrc}
        //         media="(max-width: 480px)"
        //     />
        //     <source
        //         srcSet={item.img}
        //         media="(min-width: 481px)"
        //     />
        //     <img
        //         srcSet={item.img}
        //         alt=""
        //         className="img-item"
        //     />
        // </picture>
        //                                     </Link>
        //                                 </div>
        //                             </Slide>
        //                         ))}
        //                     </Wrapper> */}

        //                     <div
        //                         className="button-arrow right"
        //                         onClick={() => handleClick('right')}
        //                     >
        //                         <ArrowRightOutlined style={{ fontSize: '30px' }} />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     {/* </div> */}
        //     {/*
        //     <div className="mobile-block-img">
        //         <img
        //             src="https://file.hstatic.net/200000312481/file/z3949119209444_8fbde8be80833559e1e4ae7477cc13af_14b8c722c505407495bd2f3c98841131_large.jpg"
        //             alt=""
        //             className="mobile-img-slider"
        //         />
        //     </div> */}
        // </div>

        // <div className="fullscreen-slider">
        //     {slides.map((slide, index) => (
        //         <div
        //             key={index}
        //             className={`fullscreen-slide ${
        //                 index === currentSlideIndex ? 'active' : 'inactive'
        //             }`}
        //         >
        //             <picture>
        //                 <source srcSet={slide.setSrc} media="(max-width: 480px)" />
        //                 <source srcSet={slide.img} media="(min-width: 481px)" />
        //                 <img srcSet={slide.img} alt="" className="img-item" />
        //             </picture>
        //         </div>
        //     ))}
        //     <button className="previous" onClick={handleClickPrevious}>
        //         Previous
        //     </button>
        //     <button className="next" onClick={handleClickNext}>
        //         Next
        //     </button>
        // </div>
    );
};

export default Slider;
