import React, { useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/NavBar/NavBar';
import Newsletter from '../components/Newsletter/Newsletter';
import Products from '../components/Products/Products';
import Slider from '../components/Slider/Slider';

// tam
import { createAxios } from '../createInstance';
import { loginSuccess } from '../redux/authRedux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from '../redux/apiCalls';
import axios from 'axios';
import PromtionVideo from '../components/PromotionVideo/PromotionVideo';
import { useState } from 'react';
import Product from '../components/Product/Product';
import { BASE_URL_API } from '../requestMethods';
//

const MoreProduct = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
`;

const More = styled.div`
    position: relative;
    display: inline-block;
    padding: 10px 28px;
    line-height: normal;
    border: 1px solid #ffffff;
    border-radius: 0;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
    background-color: #d1d1d1;
    -webkit-transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
        border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
        border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index: 1;
    color: #fff;
    overflow: hidden;
    font-weight: bold;

    &:hover {
        color: #000;
        background-color: transparent;
        border: 1px solid rgb(209, 209, 209);
    }
`;

const Info = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 30px 0;
    color: red;
`;

const Home = () => {
    // tam
    // const user = useSelector((state) => state.auth?.currentUser);
    // const dispatch = useDispatch();
    // let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // const [pagination, setPagination] = useState({
    //     page: 1,
    //     limit: 12,
    //     totalRows: 20,
    // });

    const [products, setProducts] = useState([]);

    // const pagination = {
    //     page: 1,
    //     limit: 12,
    //     totalRows: 20,
    // };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(BASE_URL_API + `products/home/`);
                setProducts(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, []);

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* <Announcement /> */}
            <Navbar />
            <Slider />
            {/* <PromtionVideo /> */}
            <Info>CÁC SẢN PHẨM MỚI</Info>

            <div className="container-product">
                <div className="grid wide">
                    <div className="row">
                        {products.map((item, index) => (
                            <div className="col l-3 c-12" key={item._id}>
                                <Product item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to={`/products`} style={{ textDecoration: 'none' }}>
                <MoreProduct>
                    <More>Xem thêm</More>
                </MoreProduct>
            </Link>
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
