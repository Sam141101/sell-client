import styled from 'styled-components';
// import Footer from '../../components/Footer/Footer';
// import Navbar from '../../components/NavBar/NavBar';
import Announcement from '../../components/Announcement/Announcement';
import { Add, East, Remove, Reply } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState, useRef } from 'react';
import { deleteProduct, getAllCart, updateProduct } from '../../redux/apiCalls';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import './cart.css';
import React from 'react';
import { createAxiosInstance } from '../../useAxiosJWT';

const SummaryItem = styled.div`
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;

const Line = styled.div`
    background: #252a2b;
    display: block;
    width: 60px;
    height: 4px;
    margin: 25px auto 0;
`;

const Cart = () => {
    const [noti, setNoti] = useState('none');

    const [comfirmDelete, setComfirmDelete] = useState('');

    const cart = useSelector((state) => state?.cart);
    const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const axiosJWT = createAxios(user, dispatch, loginSuccess);
    const axiosJWT = createAxiosInstance(user, dispatch);

    const handleRemove = (id) => {
        deleteProduct(user.token, dispatch, id, axiosJWT);
    };

    const handleUpdown = (condition, id) => {
        let test = cart?.products.filter((item) => item._id === id);
        let getQuanti = test[0].quantity;
        let getPrice = test[0].product_id.price;

        if (getQuanti === 1 && condition === 'add') {
            const quantiProduct = getQuanti + 1;
            const priceProduct = test[0].price + getPrice;
            const totalpriceProduct = cart.total + getPrice;
            const update = {
                quantiProduct: quantiProduct,
                priceProduct: priceProduct,
                totalpriceProduct: totalpriceProduct,
                condition: condition,
            };

            updateProduct(user.token, dispatch, id, update, condition, axiosJWT);
        } else if (getQuanti === 1 && condition === 'minus') {
            // hiện 1 bảng xác nhận có xoá vật phẩm khỏi giỏ hàng không
            setNoti('block');
            setComfirmDelete(id);
        } else if (getQuanti > 1) {
            // thực hiện bình thường
            if (condition === 'minus') {
                const quantiProduct = getQuanti - 1;
                const priceProduct = test[0].price - getPrice;
                const totalpriceProduct = cart.total - getPrice;
                const update = {
                    quantiProduct: quantiProduct,
                    priceProduct: priceProduct,
                    totalpriceProduct: totalpriceProduct,
                    condition: condition,
                };
                updateProduct(user.token, dispatch, id, update, condition, axiosJWT);
            } else if (condition === 'add') {
                const quantiProduct = getQuanti + 1;
                const priceProduct = test[0].price + getPrice;
                const totalpriceProduct = cart.total + getPrice;
                const update = {
                    quantiProduct: quantiProduct,
                    priceProduct: priceProduct,
                    totalpriceProduct: totalpriceProduct,
                    condition: condition,
                };
                console.log(update);
                updateProduct(user.token, dispatch, id, update, condition, axiosJWT);
            }
        }
    };

    useEffect(() => {
        const getCart = () => {
            if (!user) {
                navigate('/login');
            }
            if (user?.token) {
                getAllCart(user.token, dispatch, user._id, axiosJWT);
            }
        };
        getCart();
    }, [dispatch, user, navigate]);

    console.log('cart', cart);

    return (
        // <div className="cart-mobile-frame">
        <>
            {/* <Navbar /> */}
            <Announcement item2={`Giỏ hàng (${cart.quantity})`} show1={false} />

            <div className="grid wide">
                <div className="row">
                    <div className="col l-12">
                        <div className="cart-wrapper">
                            <h1 className="cart-title">Giỏ hàng của bạn</h1>
                            <p className="cart-top-text">
                                Có {cart.quantity} sản phẩm trong giỏ hàng
                            </p>
                            <Line></Line>

                            <ConfirmDelete
                                axiosJWT={axiosJWT}
                                noti={noti}
                                setNoti={setNoti}
                                token={user ? user.token : null}
                                comfirmDelete={comfirmDelete}
                                setComfirmDelete={setComfirmDelete}
                            />

                            <div className="cart-bottom">
                                <div className="row">
                                    <div className="col l-8 c-12">
                                        <div className="cart-info">
                                            {cart.products?.map((product, index) => (
                                                <div className="cart-product" key={index}>
                                                    <div className="cart-product-detail">
                                                        <img
                                                            className="cart-image"
                                                            alt=""
                                                            src={product.product_id.img}
                                                        />
                                                        <div className="cart-detail">
                                                            <span className="cart-product-name">
                                                                {product.product_id.title}
                                                            </span>
                                                            {/* <span className="cart-product-id">
                                                                {product.product_id.price}
                                                                ₫
                                                            </span> */}

                                                            <span className="cart-product-id">
                                                                <span className="cart-product-id">
                                                                    {product.product_id
                                                                        .discountProduct_id
                                                                        ?.discount_amount
                                                                        ? product
                                                                              .product_id
                                                                              .price *
                                                                          (1 -
                                                                              product
                                                                                  .product_id
                                                                                  .discountProduct_id
                                                                                  ?.discount_amount /
                                                                                  100)
                                                                        : product
                                                                              .product_id
                                                                              .price}
                                                                    ₫
                                                                </span>
                                                                {product.product_id
                                                                    .discountProduct_id
                                                                    ?.discount_amount !==
                                                                    0 && (
                                                                    <del>
                                                                        {
                                                                            product
                                                                                .product_id
                                                                                .price
                                                                        }
                                                                        ₫
                                                                    </del>
                                                                )}
                                                            </span>

                                                            <span className="cart-product-size">
                                                                {product.size}
                                                            </span>

                                                            <div className="cart-product-amount-container">
                                                                <div className="cart-btn-add">
                                                                    <Add
                                                                        style={{
                                                                            fontSize:
                                                                                '18px',
                                                                            color: '#abafb2',
                                                                        }}
                                                                        onClick={(e) =>
                                                                            handleUpdown(
                                                                                'add',
                                                                                product._id,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="cart-product-amount">
                                                                    {product.quantity}
                                                                </div>
                                                                <div className="cart-btn-add">
                                                                    <Remove
                                                                        style={{
                                                                            fontSize:
                                                                                '18px',
                                                                            color: '#abafb2',
                                                                        }}
                                                                        onClick={() =>
                                                                            handleUpdown(
                                                                                'minus',
                                                                                product._id,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="cart-product-price-mobile">
                                                                Thành tiền:
                                                                <span>
                                                                    {product.price}₫
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="cart-price-detail">
                                                        <div
                                                            className="cart-delete-product"
                                                            onClick={() =>
                                                                handleRemove(product._id)
                                                            }
                                                        >
                                                            <ClearIcon
                                                                style={{
                                                                    fontSize: '30px',
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="cart-product-price">
                                                            {product.price}₫
                                                        </div>
                                                    </div>

                                                    <hr className="hr hide-on-mobile"></hr>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col l-4 c-12">
                                        <div className="cart-summary">
                                            <h3 className="cart-summary-title">
                                                Thông tin đơn hàng
                                            </h3>
                                            <SummaryItem type="total">
                                                <div className="cart-summary-item-text1">
                                                    Tổng tiền:
                                                    <span className="cart-summary-item-price">
                                                        {cart.total}₫
                                                    </span>
                                                </div>
                                            </SummaryItem>

                                            <SummaryItem>
                                                <p className="cart-summary-item-text">
                                                    Phí vận chuyển sẽ được tính ở trang
                                                    thanh toán.
                                                    <br />
                                                    Bạn cũng có thể nhập mã giảm giá ở
                                                    trang thanh toán.
                                                </p>
                                            </SummaryItem>
                                            <Link
                                                style={{ textDecoration: 'none' }}
                                                to="/order"
                                            >
                                                <button className="cart-button">
                                                    Thanh Toán
                                                </button>
                                            </Link>
                                            <p className="cart-keep-shopping">
                                                <Link
                                                    to={`/products/all?page=${1}`}
                                                    style={{
                                                        color: '#D1D1D1',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <Reply
                                                        style={{ marginRight: '4px' }}
                                                    />
                                                    Tiếp tục mua hàng
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-policy">
                                <h4 className="cart-policy-title">Chính sách mua hàng</h4>
                                <ul className="cart-policy-list">
                                    <li className="cart-policy-item">
                                        <East style={{ marginRight: '5px' }} />
                                        Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ
                                        trả.
                                    </li>
                                    <li className="cart-policy-item">
                                        <East style={{ marginRight: '5px' }} />
                                        Sản phẩm còn đủ tem mác, chưa qua sử dụng.
                                    </li>
                                    <li className="cart-policy-item">
                                        <East style={{ marginRight: '5px' }} />
                                        Sản phẩm nguyên giá được đổi trong 30 ngày trên
                                        toàn hệ thống
                                    </li>
                                    <li className="cart-policy-item">
                                        <East style={{ marginRight: '5px' }} />
                                        Sản phẩm sale chỉ hỗ trợ đổi size (nếu cửa hàng
                                        còn) trong 7 ngày trên toàn hệ thống.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>

        // </div>
    );
};

export default Cart;
