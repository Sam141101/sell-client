import React, { useState, useEffect, useRef } from 'react';
import {
    AccountCircle,
    // Close,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Mail,
    Menu,
    NotificationsNone,
    Phone,
    // Search,
    ShoppingCart,
} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCart, login, logout } from '../../redux/apiCalls';
import Searchs from '../Searchs/Searchs';
import { resetProduct } from '../../redux/cartRedux';
import './navBar.css';
// import { createAxiosInstance } from '../../useAxiosJWT';
import { listItemNavBar } from '../../data';

// const listItemNav = [
//     {
//         key: 1,
//         to: '/about',
//         onclick: true,
//     },
// ];

// const Navbar = React.memo(({axiosJWT ,quantity}) => {
// const Navbar = (axiosJWT ,quantity}) => {
const Navbar = ({ axiosJWT, quantity, user, navigate, dispatch }) => {
    // console.log('log', log);
    // const user = useSelector((state) => state.auth?.currentUser);
    // const quantity = useSelector((state) => state.cart?.quantity);

    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const accessToken = user?.token;
    const id = user?._id;

    const handleClick = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
        } else {
            navigate('/cart');
        }
    };

    // Logout
    // const axiosJWT = createAxios(user, dispatch, loginSuccess);
    // const axiosJWT = createAxiosInstance(user, dispatch);
    console.log('axiosJWT', axiosJWT);

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch, id, accessToken, axiosJWT, navigate);
        resetProduct();
    };

    // profile user
    const profileUser = (e) => {
        e.preventDefault();
        navigate('/account/profile');
    };

    useEffect(() => {
        const getCart = () => {
            if (user && user?.token) {
                getAllCart(user.token, dispatch, user._id, axiosJWT);
            }
        };
        getCart();
    }, [dispatch, user]);

    const handleClickUser = (e) => {
        const action = document.querySelector('.nav-menu-user-mobile');
        if (action) {
            action.classList.toggle('actived');
        }

        const action1 = document.querySelector('.nav-menu-mobile');
        if (action1) {
            action1.classList.remove('actived');
        }

        const list1 = document.querySelector('#list1');
        const list0 = document.querySelector('#list0');
        const list2 = document.querySelector('#list2');
        const list3 = document.querySelector('#list3');

        list1.classList.remove('selected1');
        list0.classList.remove('shop0');
        list2.classList.remove('selected2');
        list3.classList.remove('selected3');

        if (action.classList.contains('actived')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleClickMenu = () => {
        // document.body.style.overflow = 'hidden';

        const action1 = document.querySelector('.nav-menu-mobile');
        if (action1) {
            action1.classList.toggle('actived');
        }

        const action = document.querySelector('.nav-menu-user-mobile');
        if (action) {
            action.classList.remove('actived');
        }

        const list1 = document.querySelector('#list1');
        const list0 = document.querySelector('#list0');
        const list2 = document.querySelector('#list2');
        const list3 = document.querySelector('#list3');

        list1.classList.remove('selected1');
        list0.classList.remove('shop0');
        list2.classList.remove('selected2');
        list3.classList.remove('selected3');

        if (action1.classList.contains('actived')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleClickHome = () => {
        const action = document.querySelector('.nav-menu-user-mobile');
        const action1 = document.querySelector('.nav-menu-mobile');
        action.classList.remove('actived');
        action1.classList.remove('actived');
        document.body.style.overflow = 'auto';
    };

    //login
    const { isFetching, error } = useSelector((state) => state?.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickLogin = (e) => {
        e.preventDefault();

        if (username === '') {
            inputRef1.current.focus();
        } else if (password === '') {
            inputRef2.current.focus();
        } else {
            login(dispatch, { username, password }, navigate);
        }

        const action = document.querySelector('.nav-menu-user-mobile');
        action.classList.remove('actived');

        if (user) {
            const action = document.querySelector('.nav-menu-user-mobile');
            action.classList.remove('actived');
        } else {
            const action = document.querySelector('.nav-menu-user-mobile');
            action.classList.add('actived');
        }

        // setShowErrorMessage(error);
    };

    const changeInputUserName = (e) => {
        // setShowErrorMessage(false);
        setUsername(e.target.value);
    };

    const changeInputPassword = (e) => {
        // setShowErrorMessage(false);
        setPassword(e.target.value);
    };

    const handleClickMore = (e) => {
        // document.body.style.overflow = 'hidden';
        const list1 = document.querySelector('#list1');
        const list0 = document.querySelector('#list0');
        const list2 = document.querySelector('#list2');
        const list3 = document.querySelector('#list3');

        // e.preventDefault();
        const taked = e.target.id;
        console.log(taked);

        if (taked === 'click0') {
            list1.classList.add('selected1');
            list0.classList.add('shop0');
        } else if (taked === 'return0') {
            list1.classList.remove('selected1');
            list0.classList.remove('shop0');
        } else if (taked === 'click1') {
            list2.classList.add('selected2');
        } else if (taked === 'return1') {
            list2.classList.remove('selected2');
        } else if (taked === 'click2') {
            list3.classList.add('selected3');
        } else if (taked === 'return2') {
            list3.classList.remove('selected3');
        }
    };

    return (
        <div className="frame-navbar">
            {/* <div className="navbar-container" style={{ marginTop: '12px' }}> */}
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12 c-12">
                        <div className="navbar-container">
                            <div className="nav-block">
                                <div className="navbar-mobile-left">
                                    {/* <Menu className="mobile-menu" /> */}
                                    <Menu
                                        className="mobile-icon menu"
                                        onClick={handleClickMenu}
                                        // id="result0"
                                        // onClick={resultClick}
                                    />
                                    <nav className="nav-menu-mobile">
                                        <span className="box-triangle">
                                            <svg
                                                className="box-triangle-mobile"
                                                viewBox="0 0 20 9"
                                                role="presentation"
                                            >
                                                <path
                                                    d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                    fill="#ffffff"
                                                ></path>
                                            </svg>
                                        </span>

                                        <div className="box-frame-transform">
                                            <div
                                                className="nav_frame-menu-mobile"
                                                id="list0"
                                            >
                                                <ul className="nav-menu-list-mobile">
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link"
                                                            to="/"
                                                        >
                                                            HOME
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link"
                                                            to="#"
                                                            id="click0"
                                                            onClick={handleClickMore}
                                                        >
                                                            Shop
                                                            <KeyboardArrowRight className="navbar-menu-item-more" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link"
                                                            to="/wait-for-confirmation"
                                                        >
                                                            kiểm tra đơn hàng
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link"
                                                            to="/about"
                                                        >
                                                            ABOUT
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <div className="nav-list-help-mobile">
                                                    <p className="nav-list-help-title-mobile">
                                                        Bạn cần hỗ trợ?
                                                    </p>
                                                    <div className="nav-list-contact-mobile">
                                                        <Phone className="nav-list-help-icon-mobile" />
                                                        <p className="nav-list-help-text-mobile">
                                                            Liên hệ: 0862642568
                                                        </p>
                                                    </div>
                                                    <div className="nav-list-contact-mobile">
                                                        <Mail className="nav-list-help-icon-mobile" />
                                                        <p className="nav-list-help-text-mobile">
                                                            outerity.local@gmail.com
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="nav_frame-menu-mobile more-list"
                                                id="list1"
                                            >
                                                <ul className="nav-menu-list-mobile">
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link return five "
                                                            // to="/"
                                                            id="return0"
                                                            onClick={handleClickMore}
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            // to="/products"
                                                            to={`/products/TEE?page=${1}`}
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem tất cả "Shop"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            // to="/"
                                                            id="click1"
                                                            onClick={handleClickMore}
                                                        >
                                                            - TOPS
                                                            <KeyboardArrowRight className="navbar-menu-item-more" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            id="click2"
                                                            onClick={handleClickMore}
                                                        >
                                                            - BOTTOM
                                                            <KeyboardArrowRight className="navbar-menu-item-more" />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className="nav_frame-menu-mobile more-list"
                                                id="list2"
                                            >
                                                <ul className="nav-menu-list-mobile">
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link return five "
                                                            // to="/"
                                                            id="return1"
                                                            onClick={handleClickMore}
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            // to="/products"
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem tất cả "TOPS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            // to="/products/TEE"
                                                            to={`/products/TEE?page=${1}`}
                                                        >
                                                            - TEE
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            // to="/products/POLO"
                                                            to={`/products/POLO?page=${1}`}
                                                        >
                                                            - POLO
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            // to="/products/HOODIE"
                                                            to={`/products/HOODIE?page=${1}`}
                                                        >
                                                            - HOODIE
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className="nav_frame-menu-mobile more-list"
                                                id="list3"
                                            >
                                                <ul className="nav-menu-list-mobile">
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link return five "
                                                            id="return2"
                                                            onClick={handleClickMore}
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            // to="/products"
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem tất cả "BOTTOMS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            // to="/products/SHORT"
                                                            to={`/products/SHORT?page=${1}`}
                                                        >
                                                            - SHORT
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>

                                <div className="navbar-center">
                                    <Link to="/" onClick={handleClickHome}>
                                        <img
                                            className="navbar-header-img"
                                            alt=""
                                            src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
                                        />
                                    </Link>
                                </div>

                                <div className="navbar-right">
                                    {user ? (
                                        <>
                                            <div className="hide-on-mobile">
                                                <div className="navbar-user">
                                                    <div className="navbar-user-img">
                                                        <img
                                                            className="navbar-img-avatar"
                                                            src={
                                                                user.img ||
                                                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                                            }
                                                            alt=""
                                                        />
                                                        <span className="navbar-user-name">
                                                            {user.username}
                                                        </span>
                                                    </div>
                                                    <div className="navbar-list-info">
                                                        <div
                                                            className="navbar-info-user"
                                                            style={{
                                                                borderTopLeftRadius:
                                                                    '3px',
                                                                borderTopRightRadius:
                                                                    '3px',
                                                            }}
                                                            onClick={profileUser}
                                                        >
                                                            Tài khoản của tôi
                                                        </div>
                                                        <Link
                                                            // to="/change-account"
                                                            to="/account/change-password"
                                                            className="navbar-info-user"
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'inherit',
                                                            }}
                                                        >
                                                            Đổi mật khẩu
                                                        </Link>
                                                        <div
                                                            className="navbar-info-user"
                                                            style={{
                                                                borderBottomLeftRadius:
                                                                    '3px',
                                                                borderBottomRightRadius:
                                                                    '3px',
                                                            }}
                                                            onClick={handleLogout}
                                                        >
                                                            Đăng xuất
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mobile-user">
                                                <AccountCircle
                                                    className="mobile-icon"
                                                    onClick={handleClickUser}
                                                    // id="result1"
                                                    // onClick={resultClick}
                                                />

                                                <nav className="nav-menu-user-mobile">
                                                    <span className="box-triangle-user">
                                                        <svg
                                                            className="box-triangle-mobile"
                                                            viewBox="0 0 20 9"
                                                            role="presentation"
                                                        >
                                                            <path
                                                                d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                                fill="#ffffff"
                                                            ></path>
                                                        </svg>
                                                    </span>

                                                    <div className="nav-info-user-mobile">
                                                        <div className="nav-info-user-mobile-title">
                                                            Thông tin tài khoản
                                                        </div>

                                                        <ul className="nav-info-user-mobile-list">
                                                            <li className="nav-info-user-mobile-list-item">
                                                                <span
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                    style={{
                                                                        opacity: '1',
                                                                    }}
                                                                >
                                                                    {/* VŨ HUY Sang */}
                                                                    {user.username}
                                                                </span>
                                                            </li>
                                                            <li className="nav-info-user-mobile-list-item">
                                                                <Link
                                                                    to="/account/profile"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                >
                                                                    Tài khoản của tôi
                                                                </Link>
                                                            </li>

                                                            <li className="nav-info-user-mobile-list-item">
                                                                <Link
                                                                    // to="/change-account"
                                                                    to="/account/change-password"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                >
                                                                    Đổi mật khẩu
                                                                </Link>
                                                            </li>

                                                            <li className="nav-info-user-mobile-list-item">
                                                                <p
                                                                    // to="/"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                    onClick={handleLogout}
                                                                >
                                                                    Đăng xuất
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="hide-on-mobile">
                                                <div className="pc-user">
                                                    <Link
                                                        // to="/register"
                                                        to="/confirm/register"
                                                        style={{
                                                            color: '#000',
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <div className="navbar-menu-item">
                                                            Đăng kí
                                                        </div>
                                                    </Link>
                                                    <Link
                                                        to="/login"
                                                        style={{
                                                            color: '#000',
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <div className="navbar-menu-item">
                                                            Đăng nhập
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mobile-user">
                                                <AccountCircle
                                                    className="mobile-icon"
                                                    onClick={handleClickUser}
                                                    // id="result1"
                                                    // onClick={resultClick}
                                                />

                                                <nav className="nav-menu-user-mobile">
                                                    <span className="box-triangle-user">
                                                        <svg
                                                            className="box-triangle-mobile"
                                                            viewBox="0 0 20 9"
                                                            role="presentation"
                                                        >
                                                            <path
                                                                d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                                fill="#ffffff"
                                                            ></path>
                                                        </svg>
                                                    </span>

                                                    <div className="nav-info-user-mobile">
                                                        <div className="nav-header-login-mobile ">
                                                            <h2 className="nav-header-login-mobile-title">
                                                                đăng nhập tài khoản
                                                            </h2>
                                                            <p className="nav-header-login-mobile-desc">
                                                                Nhập email và mật khẩu của
                                                                bạn
                                                            </p>
                                                        </div>

                                                        <div className="form-login-mobile">
                                                            <form
                                                                action=""
                                                                className="nav-form-mobile-login"
                                                            >
                                                                <div className="nav-form-block">
                                                                    <input
                                                                        type="text"
                                                                        className="nav-login-tk"
                                                                        placeholder="Email"
                                                                        ref={inputRef1}
                                                                        // onChange={(e) =>
                                                                        //     setUsername(
                                                                        //         e.target
                                                                        //             .value,
                                                                        //     )
                                                                        // }
                                                                        onChange={(e) =>
                                                                            changeInputUserName(
                                                                                e,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="nav-form-block">
                                                                    <input
                                                                        type="password"
                                                                        className="nav-login-mk"
                                                                        placeholder="Mật khẩu"
                                                                        ref={inputRef2}
                                                                        // onChange={(e) =>
                                                                        //     setPassword(
                                                                        //         e.target
                                                                        //             .value,
                                                                        //     )
                                                                        // }
                                                                        onChange={(e) =>
                                                                            changeInputPassword(
                                                                                e,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="nav-login-desc-police">
                                                                    This site is protected
                                                                    by reCAPTCHA and the
                                                                    Google
                                                                    <Link
                                                                        to=""
                                                                        className="nav-login-link"
                                                                    >
                                                                        Privacy Policy
                                                                    </Link>
                                                                    and
                                                                    <Link className="nav-login-link">
                                                                        Terms of Service
                                                                    </Link>
                                                                    apply
                                                                </div>

                                                                <button
                                                                    className="nav-btn-login-mobile"
                                                                    onClick={
                                                                        handleClickLogin
                                                                    }
                                                                    disabled={isFetching}
                                                                >
                                                                    đăng nhập
                                                                </button>

                                                                <div className="nav-more-info-mobile">
                                                                    <p className="nav-more-info-mobile-text">
                                                                        Khách hàng mới?
                                                                        <Link
                                                                            className="nav-more-info-mobile"
                                                                            to="/confirm/register"
                                                                        >
                                                                            Tạo tài khoản
                                                                        </Link>
                                                                    </p>

                                                                    <p className="nav-more-info-mobile-text">
                                                                        Quên mật khẩu?
                                                                        <Link
                                                                            className="nav-more-info-mobile"
                                                                            to="/forgot-password"
                                                                        >
                                                                            Khôi phục mật
                                                                            khẩu
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </nav>
                                            </div>
                                        </>
                                    )}
                                    {/* <Link to="/cart" onClick={handleClick}> */}

                                    <Link onClick={handleClick}>
                                        <div className="navbar-menu-item">
                                            <Badge
                                                badgeContent={user && quantity}
                                                color="secondary"
                                                className="mobile-cart-number"
                                            >
                                                <NotificationsNone
                                                    style={{ color: 'black' }}
                                                    fontSize="large"
                                                    // className="mobile-icon cart"
                                                    className="mobile-icon"
                                                />
                                            </Badge>
                                        </div>
                                    </Link>

                                    <Link onClick={handleClick}>
                                        <div className="navbar-menu-item">
                                            <Badge
                                                badgeContent={user && quantity}
                                                color="secondary"
                                                className="mobile-cart-number"
                                            >
                                                <ShoppingCart
                                                    style={{ color: 'black' }}
                                                    fontSize="large"
                                                    // className="mobile-icon cart"
                                                    className="mobile-icon"
                                                />
                                            </Badge>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="grid wide"> */}
                <div className="navbar-menu">
                    <div className="row">
                        <div className="col l-7 c-0">
                            <div className="nav-list-mobile hide-on-mobile">
                                <div className="nav-menu">
                                    <span className="nav-label">
                                        <Link className="navbar-menu-item-link" to="/">
                                            HOME
                                        </Link>
                                    </span>
                                    <div className="line"></div>
                                </div>

                                <div className="nav-menu">
                                    <span className="nav-label">
                                        <Link
                                            className="navbar-menu-item-link"
                                            // to="/products"
                                            to={`/products/all?page=${1}`}
                                        >
                                            Shop
                                            <span
                                                style={{
                                                    marginLeft: '3px',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                &#9662;
                                            </span>
                                        </Link>
                                    </span>
                                    <div className="line"></div>
                                    {/* ffff */}
                                    <ul className="nav-list">
                                        {listItemNavBar.map((item, index) => (
                                            <li key={index} className="nav-item">
                                                <Link
                                                    className="nav-menu-item-link"
                                                    to={item.to}
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="nav-menu" style={{ zIndex: '7' }}>
                                    <span className="nav-label">
                                        <Link
                                            className="navbar-menu-item-link"
                                            to="/wait-for-confirmation"
                                        >
                                            kiểm tra đơn hàng
                                        </Link>
                                    </span>
                                    <div className="line"></div>
                                </div>

                                <div className="nav-menu">
                                    <span className="nav-label">
                                        <Link
                                            className="navbar-menu-item-link"
                                            to="/about"
                                        >
                                            ABOUT
                                        </Link>
                                    </span>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col l-5 c-12">
                            <div className="navbar-left">
                                <Searchs navigate={navigate} />
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
