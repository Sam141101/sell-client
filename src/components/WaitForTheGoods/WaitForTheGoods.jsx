import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import './waitPurchase.css';
import '../../pages/About/about.css';

const NoOrder = styled.img`
        display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
}
`;

const Name = styled.div``;
const Size = styled.div``;
const Quanti = styled.div``;
const Price = styled.div``;

const WaitForTheGoods = ({ selected }) => {
    const user = useSelector((state) => state.auth?.currentUser);
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(true);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(BASE_URL_API + 'orders/find/' + user._id, {
                    headers: { token: `Bearer ${user.token}` },
                });
                setProduct(res.data.products);
            } catch (err) {}
        };
        getProduct();
    }, [user._id, user.token]);

    return (
        <>
            {show ? (
                <div className="wait-purchase-container">
                    {product?.map((item, index) => (
                        <div className="wait-purchase-product-order" key={index}>
                            <div className="wait-purchase-details-product">
                                <img
                                    className="wait-purchase-img"
                                    alt=""
                                    src={item.product_id.img}
                                />
                                <div className="wait-purchase-info">
                                    {/* <InfoBlock> */}
                                    <div className="wait-purchase-name-size">
                                        <Name>{item.product_id.title}</Name>
                                        <Size>{item.size}</Size>
                                    </div>
                                    <div className="wait-purchase-price-quanti">
                                        <Quanti>x{item.quantity}</Quanti>
                                        <Price>{item.price}</Price>
                                    </div>
                                    {/* </InfoBlock> */}
                                </div>
                            </div>

                            {/* <Method>Phương thức: {item.}</Method> */}
                            <div className="wait-purchase-block">
                                <div className="wait-purchase-status">Chờ vận chuyển</div>
                                <div className="wait-purchase-cancel-order">Huỷ đơn</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NoOrder
                    src="https://www.xanh.farm/assets/images/no-cart.png"
                    alt="image"
                />
            )}
        </>
    );
};

export default WaitForTheGoods;
