import React, { useState, useEffect } from 'react';
import { Close, RotateRight, Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';

import { mobile } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './searchs.css';

const Button = styled.button`
    position: absolute;
    padding: 0;
    top: 0px;
    bottom: 0;
    right: 0px;
    border-radius: 0 4px 4px 0;
    border: 0;
    width: 50px;
    background: #d1d1d1;
    transition: opacity 150ms linear;
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    color: ${(props) => props.searchValue};

    &:disabled {
        // opacity: 0.7;
        cursor: not-allowed;
    }
`;

const Searchs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --------------- Phần search --------------------
    const inputRef = useRef();

    const [searchTerm, setSearchTerm] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [showResult, setShowResult] = useState(true);
    // const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchTerm, 600);

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/search/${debounced}`);
        setSearchTerm('');
    };

    const handleClick = (product) => {
        navigate(`/product/${product._id}`);
        setShowResult(false);
    };

    document.addEventListener('click', (e) => {
        const box = document.getElementById('search');

        // console.log(e.target);
        if (!box.contains(e.target)) {
            setShowResult(false);
        }
    });

    useEffect(() => {
        const showProduct = async () => {
            try {
                if (!debounced.trim()) {
                    setListProduct([]);
                    return;
                }
                // setLoading(true);
                const res = await axios.get(
                    // 'http://localhost:5000/api/search?search=' + searchTerm,
                    `http://localhost:5000/api/search?search=${encodeURIComponent(
                        debounced,
                    )}`,
                );
                setListProduct(res.data);
                // setLoading(false);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        showProduct();
    }, [debounced]);

    return (
        // <div
        //     onBlur={() => {
        //         setShowResult(false);
        //     }}
        // >
        <div
            className="searchs-container"
            // onBlur={() => {
            //     setShowResult(false);
            // }}

            // onFocusOut={() => {
            //     setShowResult(false);
            // }}
            id="search"
            // onClick={(e) => moveClick(e.target)}
        >
            <input
                className="searchs-input"
                ref={inputRef}
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                id="search"
                onFocus={() => setShowResult(true)}
                // onBlur={() => {
                //     setShowResult(false);
                // }}
            />

            {!!searchTerm && (
                <div
                    className="searchs-button-close"
                    onClick={() => {
                        setSearchTerm('');
                        inputRef.current.focus();
                    }}
                >
                    <Close style={{ fontSize: '11px' }} />
                </div>
            )}

            {/* {loading && (
                <ButtonClose
                    onClick={() => {
                        setSearchTerm('');
                        inputRef.current.focus();
                    }}
                >
                    <RotateRight style={{ fontSize: '11px',
                 }} />
                </ButtonClose>
            )} */}

            {/* <button
                className="searchs-button"
                disabled={!searchTerm}
                id="button"
                onClick={handleSubmit}
                searchValue={searchTerm ? '#393838' : 'white'}
            >
                <Search fontSize="large" />
            </button> */}

            <Button
                disabled={!searchTerm}
                id="button"
                onClick={handleSubmit}
                searchValue={searchTerm ? '#393838' : 'white'}
            >
                <Search fontSize="large" />
            </Button>

            {showResult && searchTerm.length > 0 && (
                <div
                    className="searchs-list"
                    // onBlur={() => {
                    //     setShowResult(false);
                    // }}

                    // onFocusOut={() => {
                    //     setShowResult(false);
                    // }}
                >
                    {listProduct?.map((product, index) => (
                        <div
                            className="searchs-item-main"
                            key={index}
                            onClick={() => handleClick(product)}
                            // onBlur={() => {
                            //     setShowResult(false);
                            // }}

                            // onFocusOut={() => {
                            //     setShowResult(false);
                            // }}
                        >
                            <div className="searchs-item">
                                <div>
                                    <div className="searchs-item-title">
                                        {product.title}
                                    </div>
                                    <p className="searchs-item-price">{product.price}₫</p>
                                </div>
                            </div>
                            <img
                                className="searchs-item-img"
                                alt="Search"
                                src={product.img}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
        // </div>
    );
};

export default Searchs;

// <SearchContainer>
//                         <Input
//                             placeholder="Tìm kiếm sản phẩm..."
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             value={searchTerm}
//                             id="search"
//                         />

//                         <Close />

//                         <Button id="button" onClick={handleSubmit}>
//                             <Search fontSize="large" />
//                         </Button>

//                         <ListSearch>
//                             {listProduct?.map((product, index) => (
//                                 <ItemSearch key={index}>
//                                     <Item>
//                                         <ItemTitle>
//                                             <ItemName>{product.title}</ItemName>
//                                             <ItemPrice>{product.price}₫</ItemPrice>
//                                         </ItemTitle>
//                                     </Item>
//                                     <ItemImg src={product.img} />
//                                 </ItemSearch>
//                             ))}
//                         </ListSearch>
//                     </SearchContainer>
