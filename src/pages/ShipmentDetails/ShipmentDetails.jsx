import styled from 'styled-components';
// import { Add, Details, East, Remove, Reply } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import {
    ExpandMore,
    KeyboardArrowDown,
    KeyboardArrowUp,
    ShoppingCart,
} from '@mui/icons-material';

import { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { async } from '@firebase/util';
import { BASE_URL_API } from '../../requestMethods';
import './shipmentDetails.css';
import { addTemporary } from '../../redux/temporaryRedux';

const ShipmentDetails = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const cart = useSelector((state) => state.cart?.products);
    const total = useSelector((state) => state?.cart);
    const [inputs, setInputs] = useState({});
    const [product, setProduct] = useState({});
    const userId = user._id;
    const totalPrice = total.total;

    const [toggleInfo, setToggleInfo] = useState(true);

    const handleClickToggle = () => {
        setToggleInfo(!toggleInfo);
        const showList = document.querySelector('.ship_ment-details-show-mobile');
        showList.classList.toggle('show-list');
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    console.log(cart);

    const handleFinishClick = async () => {
        try {
            const res = await axios.post(
                BASE_URL_API + `${inputs.method}/pay/`,
                { inputs, cart, userId, totalPrice },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);
            dispatch(addTemporary(res.data));
            window.location.href = `${res.data.link}`;

            // navigate('/ttt');
        } catch (e) {}

        // console.log(inputs.method);
    };

    return (
        <div className="ship_ment-details-container">
            {/* <div className="ship-ment-background"></div> */}

            <div className="grid wide">
                <div className="row">
                    <div className="col l-0 c-12">
                        <Link to="/" className="ship_ment-details-container-left-link">
                            <div className="ship_ment-details-title">Outerity</div>
                        </Link>
                    </div>

                    <div className="col l-0 c-12">
                        <div className="ship_ment-details-container-right">
                            <div className="ship_ment-details-title-mobile">
                                <div
                                    className="ship_ment-details-title-mobile-left"
                                    onClick={handleClickToggle}
                                >
                                    <ShoppingCart className="ship_ment-details-title-mobile-icon" />
                                    {toggleInfo ? (
                                        <p className="ship_ment-details-title-mobile-info">
                                            Hiển thị thông tin đơn hàng
                                            <KeyboardArrowDown className="ship_ment-details-info-mobile-icon" />
                                        </p>
                                    ) : (
                                        <p className="ship_ment-details-title-mobile-info">
                                            Ẩn thông tin đơn hàng
                                            <KeyboardArrowUp className="ship_ment-details-info-mobile-icon" />
                                        </p>
                                    )}
                                </div>

                                <div className="ship_ment-details-title-mobile-right">
                                    225,000₫
                                </div>
                            </div>

                            <div className="ship_ment-details-show-mobile">
                                <div className="ship_ment-details-product-list">
                                    {cart?.map((item, index) => (
                                        <div
                                            className="ship_ment-details-details-product"
                                            key={index}
                                            quanti={item.quantity}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <img
                                                    className="ship_ment-details-img"
                                                    src={item.product_id.img}
                                                    alt=""
                                                />
                                                <div className="ship_ment-details-block-mobile-info">
                                                    <div className="ship_ment-details-name">
                                                        {item.product_id.title}
                                                    </div>
                                                    <div className="ship_ment-details-size">
                                                        {item.size}
                                                    </div>
                                                    <div className="ship_ment-details-quanti">
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ship_ment-details-price-mobile">
                                                {item.price}₫
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="ship_ment-details-total-sum">
                                    <div className="ship_ment-details-text-sum">
                                        Tổng cộng
                                    </div>
                                    <div className="ship_ment-details-text-price">
                                        VND{' '}
                                        <div className="ship_ment-details-number-price">
                                            {total.total}₫
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col l-6 c-12">
                        <div className="ship_ment-details-container-left">
                            <Link
                                to="/"
                                className="ship_ment-details-container-left-link hide-on-mobile"
                            >
                                <div className="ship_ment-details-title">Outerity</div>
                            </Link>

                            <div className="ship_ment-details-text-title">
                                Thông tin giao hàng
                            </div>
                            <div>
                                <div className="ship_ment-details-user">
                                    <img
                                        className="ship_ment-details-user-img"
                                        src={user.img}
                                        alt=""
                                    />
                                    <div>
                                        <div className="ship_ment-details-user-text">
                                            {user.username} ({user.email})
                                        </div>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to="/logout"
                                        >
                                            <div className="ship_ment-details-logout-user ">
                                                Đăng xuất
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="ship_ment-details-add-info">
                                    <input
                                        className="ship_ment-details-info-user"
                                        type="text"
                                        name="address"
                                        onChange={handleChange}
                                        placeholder="Thêm địa chỉ mới"
                                    />
                                    <input
                                        className="ship_ment-details-info-user"
                                        type="text"
                                        name="fullname"
                                        onChange={handleChange}
                                        placeholder="Họ và tên"
                                    />
                                    <input
                                        className="ship_ment-details-info-user"
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder="Số điện thoại"
                                    />
                                </div>

                                <div className="ship_ment-details-payment-method">
                                    <div className="ship_ment-details-form-key">
                                        Thanh toán
                                    </div>
                                    <div className="ship_ment-details-form-value">
                                        <div
                                            className="ship_ment-details-block-payment"
                                            onChange={handleChange}
                                        >
                                            <input
                                                className="ship_ment-details-form-value-select"
                                                type="radio"
                                                name="method"
                                                id="receive"
                                                value="receive"
                                            />
                                            <label htmlFor="receive">
                                                Thanh toán khi nhận hàng
                                            </label>
                                        </div>

                                        <div
                                            className="ship_ment-details-block-payment"
                                            onChange={handleChange}
                                        >
                                            <input
                                                className="ship_ment-details-form-value-select"
                                                type="radio"
                                                name="method"
                                                id="momo"
                                                value="momo"
                                            />
                                            <label htmlFor="momo">
                                                Thanh toán bằng Ví MoMo
                                            </label>
                                        </div>

                                        <div
                                            className="ship_ment-details-block-payment"
                                            onChange={handleChange}
                                        >
                                            <input
                                                className="ship_ment-details-form-value-select"
                                                type="radio"
                                                name="method"
                                                id="paypal"
                                                value="paypal"
                                            />
                                            <label
                                                htmlFor="paypal"
                                                className="ship_ment-details-payment-name"
                                            >
                                                <img
                                                    className="ship_ment-details-payment-paypal"
                                                    src="https://canhme.com/wp-content/uploads/2016/01/Paypal.png"
                                                    alt=""
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ship_ment-details-block-button">
                                    <Link style={{ textDecoration: 'none' }} to="/cart">
                                        <div className="ship_ment-details-cart">
                                            Giỏ hàng
                                        </div>
                                    </Link>
                                    <button
                                        className="ship_ment-details-finished"
                                        onClick={handleFinishClick}
                                    >
                                        Hoàn tất đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col l-6 c-12 hide-on-mobile">
                        <div className="row">
                            <div className="col l-1 c-0 custom-line"></div>

                            <div className="col l-11 c-12">
                                <div className="ship_ment-details-container-right">
                                    <div className="ship_ment-details-product-list">
                                        {cart?.map((item, index) => (
                                            <div
                                                className="ship_ment-details-details-product"
                                                key={index}
                                                quanti={item.quantity}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <img
                                                        className="ship_ment-details-img"
                                                        src={item.product_id.img}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <div className="ship_ment-details-name">
                                                            {item.product_id.title}
                                                        </div>
                                                        <div className="ship_ment-details-size">
                                                            {item.size}
                                                        </div>
                                                        <div className="ship_ment-details-quanti">
                                                            {item.quantity}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>{item.price}₫</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="ship_ment-details-total-sum">
                                        <div className="ship_ment-details-text-sum">
                                            Tổng cộng
                                        </div>
                                        <div className="ship_ment-details-text-price">
                                            VND{' '}
                                            <div className="ship_ment-details-number-price">
                                                {total.total}₫
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col l-5">
                        
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetails;
