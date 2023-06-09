import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from '../components/Slider/Slider';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import Product from '../components/Product/Product';
import { sliderItems } from '../../src/data';

const MoreProduct = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
`;

const More = styled.div`
    width: 128px;
    height: 35px;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    line-height: normal;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 0px;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
    background-color: rgb(161 161 161);
    transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s,
        border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
    z-index: 1;
    color: rgb(255, 255, 255);
    overflow: hidden;
    font-weight: 700;

    &:hover {
        color: #000;
        background-color: transparent;
        border: 1px solid rgb(209, 209, 209);
    }
`;

const Info = styled.div`
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    padding: 30px 0;
    color: red;
`;

const Home = ({ axios, BASE_URL_API }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(BASE_URL_API + `products/home/`);
                // dispatch(getProductList(res.data));
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
            <Slider slides={sliderItems} />
            <Info>CÁC SẢN PHẨM MỚI</Info>

            <div className="container-product">
                <div className="grid wide">
                    <div className="row pd-mobile">
                        {products.map((item, index) => {
                            return (
                                <div
                                    className={`col l-3 c-6 c${
                                        index % 2 === 0 ? '2' : '1'
                                    }`}
                                    key={item._id}
                                >
                                    <Product item={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Link to={`/products/all?page=${1}`} style={{ textDecoration: 'none' }}>
                <MoreProduct>
                    <More>Xem thêm</More>
                </MoreProduct>
            </Link>
        </div>
    );
};

export default Home;
