import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import Product from '../../components/Product/Product';
import './search.css';
import { BASE_URL_API } from '../../requestMethods';

const Search = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [products, setProducts] = useState([]);
    // ----------- Pagination -------

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        setFilterPage(newPage);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API +
                        `search/find?search=${encodeURIComponent(
                            cat,
                        )}&page=${filterPage}&limit=10`,
                );

                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);
                setPagination(pagi);
            } catch (err) {}
        };

        getProducts();
    }, [cat, filterPage]);

    console.log(pagination.totalRows);

    return (
        <div className="search-page-mobile">
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
                                <strong className="search-strong">
                                    '{decodeURIComponent(cat)}'
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {products.map((item, index) => (
                        <div className="col l-3" key={index}>
                            <div className="search-container1">
                                <Product item={item} key={item._id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {pagination.totalRows >= pagination.limit && (
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            )}

            <Footer />
        </div>
    );
};

export default Search;
