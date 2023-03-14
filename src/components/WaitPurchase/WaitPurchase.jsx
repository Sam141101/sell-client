import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';

const Container = styled.div`
    margin-top: 20px;
    height: 100%;
`;

const NoOrder = styled.img`
        display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
}
`;

const DetailsProduct = styled.div`
    display: flex;
    align-items: center;
`;
const Img = styled.img`
    width: 150px;
`;
const Info = styled.div`
    flex: 1;
    height: 150px;
    display: flex;
    justify-content: space-between;
    padding: 0px 50px;
`;
const NameSize = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 18px;
`;
const Name = styled.div``;
const Size = styled.div``;
const PriceQuanti = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 18px;
`;
const Quanti = styled.div``;
const Price = styled.div``;
const Block = styled.div`
    display: flex;
    align-items: center
    justify-content: space-between;
    padding: 15px 0;
    justify-content: space-between;
    align-items: center;
    margin: 0 50px;
    font-size: 16px;
`;
const Status = styled.div`
    margin-left: 150px;
`;
const CancelOrder = styled.div`
    padding: 10px 15px;
    background: red;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-weight: 500;
`;
const Method = styled.div``;
const InfoBlock = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ProductOrder = styled.div`
    margin: 10px 0;
    padding: 20px 0px 10px 0;
    border-bottom: 1px solid #ccc;
`;

const WaitPurchase = () => {
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

export default WaitPurchase;
