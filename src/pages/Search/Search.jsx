import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import Product from '../../components/Product/Product';
import './search.css';

const Search = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [products, setProducts] = useState([]);
    // ----------- Pagination -------

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        // limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        setFilterPage(newPage);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/products?category=${cat}&page=${filterPage}`,
                );
                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);
                setPagination(pagi);
                console.log(resultProducts);
            } catch (err) {}
        };

        getProducts();
    }, [cat, filterPage]);

    console.log(pagination.totalRows);

    return (
        // <div style={{ height: '100vh' }}>
        <div className="search-page-mobile">
            {/* <Announcement /> */}
            <Navbar />

            <div className="grid wide">
                <div className="row">
                    <div className="col l-12 c-12">
                        <div className="search-container">
                            <h3 className="search-title">Tìm kiếm</h3>
                            <p className="search-title-info">
                                Có {pagination.totalRows} sản phẩm cho tìm kiếm
                            </p>
                            <div className="search-line"></div>

                            <div className="search-title-results">
                                Kết quả tìm kiếm cho
                                <strong className="search-strong">'{cat}'</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {products.map((item) => (
                        <div className="col l-3">
                            <div className="search-container1">
                                <Product item={item} key={item._id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />

            <Footer />
        </div>
    );
};

export default Search;
