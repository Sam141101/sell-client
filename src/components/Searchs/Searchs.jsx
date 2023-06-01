import React, { useState, useEffect } from 'react';
import { Close, Search } from '@mui/icons-material';

import axios from 'axios';
import { useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './searchs.css';
import { BASE_URL_API } from '../../requestMethods';

const Searchs = ({ navigate }) => {
    // --------------- Phần search --------------------
    const inputRef = useRef();
    const listRef = useRef();

    const [searchTerm, setSearchTerm] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const [showNot, setShowNot] = useState(false);
    const debounced = useDebounce(searchTerm, 600);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorMessage = '';
        if (!debounced || !debounced.trim()) {
            errorMessage = 'Vui lòng nhập trường tìm kiếm.';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        navigate(`/search/${encodeURIComponent(debounced)}`);
        setSearchTerm('');
    };

    const handleClick = (product) => {
        console.log(product);
        navigate(`/product/${product._id}`);
        if (showResult) {
            setShowResult(false);
        }
    };

    useEffect(() => {
        if (debounced !== '') {
            console.log('debounced------');
            const showProduct = async () => {
                try {
                    if (!debounced.trim()) {
                        setListProduct([]);
                        return;
                    }

                    const res = await axios.get(
                        BASE_URL_API + `search?search=${encodeURIComponent(debounced)}`,
                    );
                    setListProduct(res.data);

                    console.log('res.data');
                } catch (err) {
                    console.log(err);
                }
            };
            showProduct();
        }
    }, [debounced]);

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target) &&
                listRef.current &&
                !listRef.current.contains(e.target)
            ) {
                setShowResult(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if (debounced === '') {
            setShowNot(false);
        } else if (debounced !== '' && listProduct.length === 0) {
            setShowNot(true);
        } else if (debounced !== '' && listProduct.length > 0) {
            setShowNot(false);
        }
    }, [debounced, listProduct]);

    return (
        <div className="searchs-container">
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
                //     setIsHoveringList(false);
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
                    <Close className="button-close-icon" />
                </div>
            )}

            <button
                aria-label="Tìm kiếm"
                id="button"
                onClick={handleSubmit}
                className="searchs-button"
            >
                <Search fontSize="large" />
            </button>

            {showResult && searchTerm.length > 0 && (
                <div
                    className="searchs-list"
                    ref={listRef}
                    onMouseLeave={() => setShowResult(false)}
                >
                    {listProduct?.map((product, index) => (
                        <div
                            className="searchs-item-main"
                            key={index}
                            onClick={() => handleClick(product)}
                        >
                            <div className="searchs-item">
                                <div>
                                    <div className="searchs-item-title">
                                        {product.title}
                                    </div>
                                    <p className="searchs-item-price">
                                        {/* {product.price}₫ */}
                                        <span>
                                            {product?.discount_amount
                                                ? product.price *
                                                  (1 - product.discount_amount / 100)
                                                : product.price}
                                            ₫
                                        </span>

                                        {product?.discount_amount &&
                                            product.discount_amount !== 0 && (
                                                <span className="pro-price-del">
                                                    <del>{product.price}₫</del>
                                                </span>
                                            )}
                                    </p>
                                </div>
                            </div>
                            <img
                                className="searchs-item-img"
                                alt="Search"
                                src={product.img}
                            />
                        </div>
                    ))}

                    <div
                        style={showNot ? { display: 'block' } : { display: 'none' }}
                        className="result-more-item-link"
                    >
                        Không có sản phẩm nào...
                    </div>
                </div>
            )}
        </div>
    );
};

export default Searchs;
