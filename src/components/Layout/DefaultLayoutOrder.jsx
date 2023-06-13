import { Create } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import { createAxiosInstance } from '../../useAxiosJWT';
import { changDate, formatMoney } from '../../support';
import { getAddress } from '../../redux/addressRedux';
import {
    getAmountAccept,
    getAmountCancel,
    getAmountComplete,
    getAmountDelivery,
    getAmountPending,
} from '../../redux/orderRedux';

const profile = [
    {
        title: 'Hồ sơ',
        to: 'profile',
    },
    {
        title: 'Đổi mật khẩu',
        to: 'change-password',
    },
    {
        title: 'Địa chỉ',
        to: 'address',
    },
];

function DefaultLayoutOrder({ children, show1, show2, show3 }) {
    let amountpending = useSelector((state) => state.order?.amountpending);
    let amountaccept = useSelector((state) => state.order?.amountaccept);
    let amountdelivery = useSelector((state) => state.order?.amountdelivery);
    let amountcomplete = useSelector((state) => state.order?.amountcomplete);
    let amountcancel = useSelector((state) => state.order?.amountcancel);

    const location = useLocation();
    const pathpolicy = location.pathname.split('/')[1];
    console.log('pathpolicy', pathpolicy, typeof pathpolicy);

    const accounttype = location.pathname.split('/')[2];

    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxiosInstance(user, dispatch);

    useEffect(() => {
        if (
            pathpolicy === 'wait-for-confirmation' ||
            pathpolicy === 'waiting-for-the-goods' ||
            pathpolicy === 'delivering' ||
            pathpolicy === 'complete' ||
            pathpolicy === 'canceled'
            // ||
            // pathpolicy === 'account'
        ) {
            console.log('vooo');
            const getProduct = async () => {
                try {
                    const res = await axiosJWT.get(
                        // BASE_URL_API +
                        // `orders/user-amount-order-status?userid=${user._id}`,
                        BASE_URL_API + `orders/amount/${user._id}`,
                        {
                            headers: { token: `Bearer ${user.token}` },
                        },
                    );

                    dispatch(getAmountPending(res.data.pending));
                    dispatch(getAmountAccept(res.data.accept));
                    dispatch(getAmountDelivery(res.data.delivery));
                    dispatch(getAmountComplete(res.data.complete));
                    dispatch(getAmountCancel(res.data.cancel));
                    dispatch(getAddress(res.data.address));
                } catch (err) {
                    console.log(err);
                }
            };
            getProduct();
        }
    }, [user._id, user.token, pathpolicy]);

    return (
        <div className="default-layout-wrapper">
            {/* {!show2 && ( */}
            <Navbar
                axiosJWT={axiosJWT}
                quantity={quantity}
                user={user}
                navigate={navigate}
                dispatch={dispatch}
            />
            {/* )} */}

            <div
                className={`default-layout-order-wrapper ${
                    accounttype !== 'profile' ||
                    accounttype !== 'change-password' ||
                    accounttype !== 'address'
                        ? 'detailss'
                        : ''
                }`}
            >
                <div className="grid wide">
                    <div className="row">
                        {/* {!show2 && ( */}
                        <div className="left-deffau col l-3 c-12">
                            <div className="default-layout-order-container-left">
                                <div className="default-layout-order-container-left-info">
                                    <img
                                        className="default-layout-order-img-user"
                                        src={
                                            user.img ||
                                            'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                        }
                                        alt=""
                                    />
                                    <div className="default-layout-order-change-info-user">
                                        <h4 className="default-layout-order-title-user">
                                            {user.username}
                                        </h4>
                                        <span className="default-layout-order-change-info">
                                            <Create
                                                style={{
                                                    fontSize: '18px',
                                                    marginRight: '5px',
                                                }}
                                            />
                                            Sửa hồ sơ
                                        </span>
                                    </div>
                                </div>

                                <div className="default-layout-order-more-items">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: `${
                                                pathpolicy === 'account' ? '#ee4d2d' : ''
                                            } `,
                                        }}
                                        to="/account/profile"
                                    >
                                        <div className="default-layout-order-item">
                                            <img
                                                className="default-layout-order-img-item "
                                                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                                                alt=""
                                            />
                                            Tài khoản của tôi
                                        </div>
                                    </Link>

                                    <div className="default-layout-order-account">
                                        {profile.map((item, i) => (
                                            <div
                                                className="default-layout-order-account-frame"
                                                key={i}
                                            >
                                                <Link
                                                    className={`default-layout-order-account-link ${
                                                        accounttype === `${item.to}`
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                    to={`/account/${item.to}`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: `${
                                                pathpolicy === 'wait-for-confirmation' ||
                                                pathpolicy === 'waiting-for-the-goods' ||
                                                pathpolicy === 'delivering' ||
                                                pathpolicy === 'complete' ||
                                                pathpolicy === 'canceled'
                                                    ? '#ee4d2d'
                                                    : ''
                                            } `,
                                        }}
                                        to="/wait-for-confirmation"
                                    >
                                        <div className="default-layout-order-item">
                                            <img
                                                className="default-layout-order-img-item"
                                                src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                                                alt=""
                                            />
                                            Đơn mua
                                        </div>
                                    </Link>

                                    <Link
                                        // style={{ textDecoration: 'none' }}
                                        style={{
                                            textDecoration: 'none',
                                            color: `${
                                                pathpolicy === 'voucher-user'
                                                    ? '#ee4d2d'
                                                    : ''
                                            } `,
                                        }}
                                        to="/voucher-user"
                                    >
                                        <div className="default-layout-order-item">
                                            <img
                                                className="default-layout-order-img-item "
                                                src="https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748"
                                                alt=""
                                            />
                                            Kho voucher
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                        <div className="col l-9 c-12">
                            <div className="default-layout-order-container-right">
                                {/* {show1 && !show2 && ( */}
                                {show1 && (
                                    <div className="default-layout-order-manage-user">
                                        <Link
                                            style={{
                                                color: `${
                                                    pathpolicy === 'wait-for-confirmation'
                                                        ? 'red'
                                                        : ''
                                                }`,
                                            }}
                                            className="default-layout-order-select-link"
                                            to="/wait-for-confirmation"
                                        >
                                            Chờ xác nhận
                                            {amountpending !== 0 && (
                                                <span className="amount-order">
                                                    {amountpending}
                                                </span>
                                            )}
                                        </Link>
                                        <Link
                                            className="default-layout-order-select-link"
                                            style={{
                                                color: `${
                                                    pathpolicy === 'waiting-for-the-goods'
                                                        ? 'red'
                                                        : ''
                                                }`,
                                            }}
                                            to="/waiting-for-the-goods"
                                        >
                                            Chờ lấy hàng
                                            {amountaccept !== 0 && (
                                                <span className="amount-order">
                                                    {amountaccept}
                                                </span>
                                            )}
                                        </Link>

                                        <Link
                                            className="default-layout-order-select-link"
                                            style={{
                                                color: `${
                                                    pathpolicy === 'delivering'
                                                        ? 'red'
                                                        : ''
                                                }`,
                                            }}
                                            to="/delivering"
                                        >
                                            Đang giao
                                            {amountdelivery !== 0 && (
                                                <span className="amount-order">
                                                    {amountdelivery}
                                                </span>
                                            )}
                                        </Link>

                                        <Link
                                            className="default-layout-order-select-link"
                                            style={{
                                                color: `${
                                                    pathpolicy === 'complete' ? 'red' : ''
                                                }`,
                                            }}
                                            to="/complete"
                                        >
                                            Hoàn thành
                                            {amountcomplete !== 0 && (
                                                <span className="amount-order">
                                                    {amountcomplete}
                                                </span>
                                            )}
                                        </Link>
                                        <Link
                                            className="default-layout-order-select-link"
                                            style={{
                                                color: `${
                                                    pathpolicy === 'canceled' ? 'red' : ''
                                                }`,
                                            }}
                                            to="/canceled"
                                        >
                                            Đã huỷ
                                            {amountcancel !== 0 && (
                                                <span className="amount-order">
                                                    {amountcancel}
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                )}

                                <div>
                                    {React.Children.map(children, (child) =>
                                        React.cloneElement(child, {
                                            axiosJWT: axiosJWT,
                                            quantity: quantity,
                                            user: user,
                                            navigate: navigate,
                                            dispatch: dispatch,
                                            BASE_URL_API: BASE_URL_API,
                                            axios: axios,
                                            changDate: changDate,
                                            formatMoney: formatMoney,
                                            amountpending: amountpending,
                                            amountaccept: amountaccept,
                                            amountdelivery: amountdelivery,
                                            amountcomplete: amountcomplete,
                                            amountcancel: amountcancel,
                                        }),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {show3 && <Footer layoutVoucher={true} />}
        </div>
    );
}

export default DefaultLayoutOrder;
