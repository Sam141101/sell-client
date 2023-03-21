import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import './waitForProduct.css';
import '../../pages/About/about.css';

const WaitForConfirmation = ({ selected }) => {
    const user = useSelector((state) => state.auth?.currentUser);
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        try {
            const res = await axios.put(
                BASE_URL_API + 'orders/order-cancel/' + user._id,
                { orderId: e },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);
            navigate('/canceled');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API + 'orders/find/wait-for-confirmation/' + user._id,
                    {
                        headers: { token: `Bearer ${user.token}` },
                    },
                );

                if (res.data.length > 0) {
                    setShow(true);
                }
                setProduct(res.data);
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token]);

    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    {product?.map((item) => (
                        <div className="wait-for-product-list" key={item._id}>
                            {item?.products.map((item1, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <div className="wait-purchase-details-product">
                                        <img
                                            className="wait-purchase-img"
                                            alt=""
                                            src={item1.product_id.img}
                                        />
                                        <div className="wait-purchase-info">
                                            <div className="wait-purchase-name-size">
                                                <div>{item1.product_id.title}</div>
                                                <div>{item1.size}</div>
                                            </div>
                                            <div className="wait-purchase-price-quanti">
                                                <div>x{item1.quantity}</div>
                                                <div>{item1.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="wait-purchase-block">
                                <div className="wait-purchase-status">
                                    <span>Trạng thái:</span>
                                    Chờ xác nhận
                                </div>

                                <div className="wait-purchase-total-price">
                                    Tổng số tiền:
                                    <span className="wait-purchase-total-price-text">
                                        {item.amount}₫
                                    </span>
                                </div>
                            </div>
                            <div className="wait-purchase-cancel-order">
                                <button
                                    className="wait-purchase-cancel-order-button"
                                    onClick={handleClick(item._id)}
                                >
                                    Huỷ đơn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="wait-for-frame-block">
                    <img
                        src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                        alt="imag"
                        className="wait-for-product"
                    />
                </div>
            )}
        </>
    );
};

export default WaitForConfirmation;
