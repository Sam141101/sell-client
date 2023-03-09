import React, { useState, useEffect } from 'react';
import { Close, Create, Person, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Announcement from '../Announcement/Announcement';
import app from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import Footer from '../Footer/Footer';
import Pagination from '../Pagination/Pagination';
// import Products from '../components/Products';
import Product from '../Product/Product';
// import app from '../firebase'
import './similar.css';

const Similar = ({ cat }) => {
    const location = useLocation();
    // const cat = location.pathname.split('/')[2];
    const [products, setProducts] = useState([]);
    // console.log(cat);
    // ----------- Pagination -------

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        setFilterPage(newPage);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/products?category=${cat}&page=${filterPage}&limit=6`,
                );
                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);
                // console.log(resultProducts.length);
                setPagination(pagi);
                // console.log(resultProducts);
            } catch (err) {}
        };

        getProducts();
    }, [cat, filterPage]);

    return (
        <>
            <div className="similar-title-relate">SẢN PHẨM LIÊN QUAN</div>
            {/* <div className="similar-container1">
                {products?.map((item) => (
                    <Product item={item} key={item._id} />
                ))}
            </div> */}

            <div className="grid wide">
                <div className="row">
                    {products?.map((item) => (
                        <div className="col l-3 c-12" key={item._id}>
                            {/* <Product item={item} key={item._id} /> */}
                            <Product item={item} />
                        </div>
                    ))}
                </div>
            </div>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
    );
};

export default Similar;
