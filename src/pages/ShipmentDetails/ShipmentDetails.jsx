import styled from 'styled-components';
// import { Add, Details, East, Remove, Reply } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    ExpandMore,
    KeyboardArrowDown,
    KeyboardArrowUp,
    ShoppingCart,
} from '@mui/icons-material';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { async } from '@firebase/util';
import { BASE_URL_API } from '../../requestMethods';
import './shipmentDetails.css';
import { addTemporary } from '../../redux/temporaryRedux';
// import useDebounce from '../../hooks/useDebounce';

const ShipmentDetails = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const cart = useSelector((state) => state.cart?.products);
    const total = useSelector((state) => state?.cart);
    const userId = user._id;
    const totalPrice = total.total;

    const [inputs, setInputs] = useState({});
    const [infoCoupon, setInfoCoupon] = useState({});
    const [show, setShow] = useState(false);

    const [toggleInfo, setToggleInfo] = useState(true);
    const [codeCoupon, setCodeCoupon] = useState('');
    const [notify, setNotify] = useState();
    const [totalPriceProduct, setTotalPriceProduct] = useState(totalPrice);
    const [totalPriceDelivery, setTotalPriceDelivery] = useState(30000);
    const [couponUpdated, setCouponUpdated] = useState(false);

    const [initialTotalPriceProduct, setInitialTotalPriceProduct] = useState(totalPrice);
    const [initialTotalPriceDelivery, setInitialTotalPriceDelivery] = useState(30000); /// 30000 ------> total delivery

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickToggle = () => {
        setToggleInfo(!toggleInfo);
        const showList = document.querySelector('.ship_ment-details-show-mobile');
        showList.classList.toggle('show-list');
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleFinishClick = async () => {
        try {
            let infoOrder;

            if (notify === 'Át mã giảm giá thành công.') {
                infoOrder = {
                    inputs: inputs,
                    cart: cart,
                    userId: userId,
                    totalPrice: totalPrice,
                    codeCoupon: codeCoupon,
                };
            } else if (notify === '') {
                infoOrder = {
                    inputs: inputs,
                    cart: cart,
                    userId: userId,
                    totalPrice: totalPrice,
                };
                console.log('Không dùng phiếu giảm giá');
            } else {
                console.log('không thể dùng mã giảm giá');
                return;
            }

            const res = await axios.post(
                BASE_URL_API + `${inputs.method}/pay/`,
                infoOrder,
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            console.log(res.data);

            if (inputs.method === 'paypal') {
                dispatch(addTemporary(res.data));
                window.location.href = `${res.data.link}`;
            } else if (res.data === 'success') {
                setShow(true);
                setTimeout(() => {
                    navigate('/wait-for-confirmation');
                }, 5000);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeInput = (e) => {
        setCodeCoupon(e.target.value);
        setNotify('');
    };

    const handleUseVoucher = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(
                BASE_URL_API +
                    `discounts/use-coupon/${user._id}/${codeCoupon}/${totalPrice}`,
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            setNotify(res.data.message);
            setInfoCoupon(res.data.infoCoupon);
            setCouponUpdated(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (notify === 'Át mã giảm giá thành công.' && couponUpdated) {
            let newTotalPrice;
            if (infoCoupon.descCoupon === 'Mã giảm giá') {
                if (infoCoupon.discount_type === 'percentage') {
                    newTotalPrice =
                        totalPriceProduct * (1 - infoCoupon.discount_amount / 100);
                } else {
                    newTotalPrice = totalPriceProduct - infoCoupon.discount_amount;
                }
                setTotalPriceProduct(newTotalPrice);
            } else {
                if (infoCoupon.discount_type === 'percentage') {
                    newTotalPrice =
                        totalPriceDelivery * (1 - infoCoupon.discount_amount / 100);
                } else {
                    newTotalPrice = totalPriceDelivery - infoCoupon.discount_amount;
                }
                setTotalPriceDelivery(newTotalPrice);
            }
            setCouponUpdated(false);
        } else if (notify === '' || notify !== 'Át mã giảm giá thành công.') {
            // Nếu không sử dụng mã giảm giá hoặc sử dụng mã thất bại, trả về giá trị ban đầu của sản phẩm
            setTotalPriceProduct(initialTotalPriceProduct);
            setTotalPriceDelivery(initialTotalPriceDelivery);
        }
    }, [notify, infoCoupon, couponUpdated]);

    return (
        <div className="ship_ment-details-container">
            <>
                {show && (
                    <div className="user-profile-mobile-frame">
                        <div className="user-profile-wrapper">
                            <div className="user-profile-noti">
                                <img
                                    className="user-profile-noti-img"
                                    src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                                    alt=""
                                />

                                <p className="user-profile-text-noti">
                                    Đặt hàng thành công
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </>

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

                                <div className="ship_ment-details-voucher">
                                    <div className="ship_ment-details-voucher-wrapper">
                                        <div className="ship_ment-details-voucher-block">
                                            <input
                                                type="text"
                                                className="ship_ment-details-voucher-input"
                                                placeholder="Mã giảm giá"
                                                // ref={inputRef1}
                                                onChange={(e) => handleChangeInput(e)}
                                            />
                                        </div>

                                        <button
                                            style={
                                                codeCoupon !== ''
                                                    ? {
                                                          backgroundColor: '#338dbc',
                                                          color: 'white',
                                                          cursor: 'pointer',
                                                      }
                                                    : {}
                                            }
                                            className={`ship_ment-details-use-voucher ${
                                                notify === 'Át mã giảm giá thành công.'
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            onClick={handleUseVoucher}
                                            // disabled={

                                            // }
                                        >
                                            Sử dụng
                                        </button>
                                    </div>

                                    {notify && (
                                        <p className="notify-voucher-line">
                                            {notify}
                                            {/* Không thể sử dunjg */}
                                        </p>
                                    )}
                                </div>

                                <div className="ship_ment-details-total-delivery">
                                    <div className="ship_ment-details-title-price-product">
                                        <span>Tạm tính</span>
                                        <span>{totalPriceProduct}₫</span>
                                    </div>
                                    <div className="ship_ment-details-delivery-price">
                                        <span>Phí vận chuyển</span>
                                        {user.address ? (
                                            <span>{totalPriceDelivery}₫</span>
                                        ) : (
                                            <span>–</span>
                                        )}
                                    </div>
                                </div>

                                <div className="ship_ment-details-total-sum">
                                    <div className="ship_ment-details-text-sum">
                                        Tổng cộng
                                    </div>
                                    <div className="ship_ment-details-text-price">
                                        VND{' '}
                                        <div className="ship_ment-details-number-price">
                                            {totalPriceProduct + totalPriceDelivery}₫
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

                                    <div className="ship_ment-details-voucher">
                                        <div className="ship_ment-details-voucher-wrapper">
                                            <div className="ship_ment-details-voucher-block">
                                                <input
                                                    type="text"
                                                    className="ship_ment-details-voucher-input"
                                                    placeholder="Mã giảm giá"
                                                    // ref={inputRef1}
                                                    onChange={(e) => handleChangeInput(e)}
                                                />
                                            </div>

                                            <button
                                                style={
                                                    codeCoupon !== ''
                                                        ? {
                                                              backgroundColor: '#338dbc',
                                                              color: 'white',
                                                              cursor: 'pointer',
                                                          }
                                                        : {}
                                                }
                                                className={`ship_ment-details-use-voucher ${
                                                    notify ===
                                                    'Át mã giảm giá thành công.'
                                                        ? 'disabled'
                                                        : ''
                                                }`}
                                                onClick={handleUseVoucher}
                                                // disabled={

                                                // }
                                            >
                                                Sử dụng
                                            </button>
                                        </div>

                                        {notify && (
                                            <p className="notify-voucher-line">
                                                {notify}
                                                {/* Không thể sử dunjg */}
                                            </p>
                                        )}
                                    </div>

                                    <div className="ship_ment-details-total-delivery">
                                        <div className="ship_ment-details-title-price-product">
                                            <span>Tạm tính</span>
                                            <span>{totalPriceProduct}₫</span>
                                        </div>
                                        <div className="ship_ment-details-delivery-price">
                                            <span>Phí vận chuyển</span>
                                            {user.address ? (
                                                <span>{totalPriceDelivery}₫</span>
                                            ) : (
                                                <span>–</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ship_ment-details-total-sum">
                                        <div className="ship_ment-details-text-sum">
                                            Tổng cộng
                                        </div>
                                        <div className="ship_ment-details-text-price">
                                            VND{' '}
                                            <div className="ship_ment-details-number-price">
                                                {totalPriceProduct + totalPriceDelivery}₫
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetails;
