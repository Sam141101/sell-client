import { Create } from '@mui/icons-material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Announcement from '../Announcement/Announcement';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

function DefaultLayoutOrder({ children, show1 }) {
    const location = useLocation();
    const pathpolicy = location.pathname.split('/')[1];
    const user = useSelector((state) => state.auth?.currentUser);

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
                                        style={{ textDecoration: 'none' }}
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
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: `${show1 ? 'red' : ''} `,
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
                                </div>
                            </div>
                        </div>
                        <div className="col l-9 c-12">
                            <div className="default-layout-order-container-right">
                                <div className="default-layout-order-manage-user">
                                    <Link
                                        style={{ color: `${show1 === 1 ? 'red' : ''}` }}
                                        className="default-layout-order-select-link"
                                        to="/wait-for-confirmation"
                                    >
                                        Chờ xác nhận
                                    </Link>
                                    <Link
                                        className="default-layout-order-select-link"
                                        style={{ color: `${show1 === 2 ? 'red' : ''}` }}
                                        to="/waiting-for-the-goods"
                                    >
                                        Chờ lấy hàng
                                    </Link>

                                    <Link
                                        className="default-layout-order-select-link"
                                        style={{ color: `${show1 === 3 ? 'red' : ''}` }}
                                        to="/delivering"
                                    >
                                        Đang giao
                                    </Link>

                                    <Link
                                        className="default-layout-order-select-link"
                                        style={{ color: `${show1 === 4 ? 'red' : ''}` }}
                                        to="/complete"
                                    >
                                        Hoàn thành
                                    </Link>
                                    <Link
                                        className="default-layout-order-select-link"
                                        style={{ color: `${show1 === 5 ? 'red' : ''}` }}
                                        to="/canceled"
                                    >
                                        Đã huỷ
                                    </Link>
                                </div>

                                <div>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayoutOrder;
