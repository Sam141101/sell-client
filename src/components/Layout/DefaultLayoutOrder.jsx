import { Create } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';

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
    const location = useLocation();
    const pathpolicy = location.pathname.split('/')[1];

    const accounttype = location.pathname.split('/')[2];

    const user = useSelector((state) => state.auth?.currentUser);

    const [inputs, setInputs] = useState({
        pending: 0,
        accept: 0,
        delivery: 0,
        complete: 0,
        cancel: 0,
    });

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API + `orders/amount-order-status/${user._id}`,
                );

                setInputs({
                    pending: res.data.pending,
                    accept: res.data.accept,
                    delivery: res.data.delivery,
                    complete: res.data.complete,
                    cancel: res.data.cancel,
                });
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [user._id]);

    return (
        <div className="default-layout-wrapper">
            <Navbar />

            <div className="default-layout-order-wrapper">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-3 c-12">
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
                        <div className="col l-9 c-12">
                            <div className="default-layout-order-container-right">
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
                                            {inputs.pending !== 0 && (
                                                <span className="amount-order">
                                                    {inputs.pending}
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
                                            {inputs.accept !== 0 && (
                                                <span className="amount-order">
                                                    {inputs.accept}
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
                                            {inputs.delivery !== 0 && (
                                                <span className="amount-order">
                                                    {inputs.delivery}
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
                                            {inputs.complete !== 0 && (
                                                <span className="amount-order">
                                                    {inputs.complete}
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
                                            {inputs.cancel !== 0 && (
                                                <span className="amount-order">
                                                    {inputs.cancel}
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                )}

                                <div>{children}</div>
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
