import React, { useState, useEffect } from 'react';
import { Close, Search } from '@mui/icons-material';

// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './searchs.css';
import { BASE_URL_API } from '../../requestMethods';

const Searchs = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    // --------------- Phần search --------------------
    const inputRef = useRef();
    const listRef = useRef();

    const [searchTerm, setSearchTerm] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [showResult, setShowResult] = useState(true);
    // const [isHoveringList, setIsHoveringList] = useState(false);

    // const [loading, setLoading] = useState(false);

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
        const showProduct = async () => {
            try {
                if (!debounced.trim()) {
                    setListProduct([]);
                    return;
                }
                // setLoading(true);
                const res = await axios.get(
                    BASE_URL_API + `search?search=${encodeURIComponent(debounced)}`,
                );
                setListProduct(res.data);
                // setLoading(false);
                console.log('res.data');
            } catch (err) {
                console.log(err);
            }
        };
        showProduct();
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

    console.log('listProduct', listProduct);

    return (
        <div className="searchs-container" id="search">
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
                // disabled={!searchTerm}
                id="button"
                onClick={handleSubmit}
                // searchValue={searchTerm ? '#393838' : 'white'}
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

                        // <Link
                        //     className="searchs-item-main"
                        //     key={index}
                        //     onClick={() => handleClick(product)}
                        //     to={`/product/${product._id}`}
                        // >
                        //     <div className="searchs-item">
                        //         <div>
                        //             <div className="searchs-item-title">
                        //                 {product.title}
                        //             </div>
                        //             <p className="searchs-item-price">{product.price}₫</p>
                        //         </div>
                        //     </div>
                        //     <img
                        //         className="searchs-item-img"
                        //         alt="Search"
                        //         src={product.img}
                        //     />
                        // </Link>
                    ))}

                    <div
                        style={showNot ? { display: 'block' } : { display: 'none' }}
                        className="result-more-item-link"
                    >
                        Không có sản phẩm nào...
                    </div>

                    {/* <div className="result-more-item">
                        <Link className="result-more-item-link" to="/">
                            Xem thêm 99 sản phẩm
                        </Link>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Searchs;

{
    /* {loading && (
                <ButtonClose
                    onClick={() => {
                        setSearchTerm('');
                        inputRef.current.focus();
                    }}
                >
                    <RotateRight style={{ fontSize: '11px',
                 }} />
                </ButtonClose>
            )} */
}

{
    /* <button
                className="searchs-button"
                disabled={!searchTerm}
                id="button"
                onClick={handleSubmit}
                searchValue={searchTerm ? '#393838' : 'white'}
            >
                <Search fontSize="large" />
            </button> */
}
