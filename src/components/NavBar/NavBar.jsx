import React, { useState, useEffect, useRef } from 'react';
import {
    AccountCircle,
    Close,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Mail,
    Menu,
    Phone,
    Search,
    ShoppingCart,
} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';

import { mobile } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCart, login, logout } from '../../redux/apiCalls';
import { createAxios } from '../../createInstance';
import { loginSuccess, logoutSuccess } from '../../redux/authRedux';
import axios from 'axios';
import Searchs from '../Searchs/Searchs';
import { resetProduct } from '../../redux/cartRedux';
import './navBar.css';
// import '../../responesive.css';

const Navbar = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);

    // console.log(user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch, navigate, id, accessToken, axiosJWT);
        resetProduct();
    };

    // profile user
    const profileUser = (e) => {
        e.preventDefault();
        navigate('/account/profile');
    };

    useEffect(() => {
        const getCart = () => {
            if (user) {
                // console.log(user);
                getAllCart(user.token, dispatch, user._id);
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

    // const [showErrorMessage, setShowErrorMessage] = useState(false);

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
                                                            to="/"
                                                        >
                                                            ki???m tra ????n h??ng
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
                                                        B???n c???n h??? tr????
                                                    </p>
                                                    <div className="nav-list-contact-mobile">
                                                        <Phone className="nav-list-help-icon-mobile" />
                                                        <p className="nav-list-help-text-mobile">
                                                            Li??n h???: 0862642568
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
                                                            Quay v???
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            to="/products"
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem t???t c??? "Shop"
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
                                                            Quay v???
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            // to="/products"
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem t???t c??? "TOPS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            to="/products/TEE"
                                                        >
                                                            - TEE
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            to="/products/POLO"
                                                        >
                                                            - POLO
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            to="/products/HOODIE"
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
                                                            Quay v???
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link text-inherit"
                                                            // to="/products"
                                                            // onClick={handleClickMore}
                                                        >
                                                            Xem t???t c??? "BOTTOMS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link four"
                                                            to="/products/SHORT"
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
                                                            T??i kho???n c???a t??i
                                                        </div>
                                                        <Link
                                                            to="/change-account"
                                                            className="navbar-info-user"
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'inherit',
                                                            }}
                                                        >
                                                            ?????i m???t kh???u
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
                                                            ????ng xu???t
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
                                                            Th??ng tin t??i kho???n
                                                        </div>

                                                        <ul className="nav-info-user-mobile-list">
                                                            <li className="nav-info-user-mobile-list-item">
                                                                <span
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                    style={{
                                                                        opacity: '1',
                                                                    }}
                                                                >
                                                                    {/* V?? HUY Sang */}
                                                                    {user.username}
                                                                </span>
                                                            </li>
                                                            <li className="nav-info-user-mobile-list-item">
                                                                <Link
                                                                    to="/account/profile"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                >
                                                                    T??i kho???n c???a t??i
                                                                </Link>
                                                                <Link
                                                                    to="/change-account"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                >
                                                                    ?????i m???t kh???u
                                                                </Link>
                                                            </li>
                                                            <li className="nav-info-user-mobile-list-item">
                                                                <p
                                                                    // to="/"
                                                                    className="nav-info-user-mobile-list-item-link"
                                                                    onClick={handleLogout}
                                                                >
                                                                    ????ng xu???t
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
                                                            REGISTER
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
                                                            SIGN IN
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
                                                                ????ng nh???p t??i kho???n
                                                            </h2>
                                                            <p className="nav-header-login-mobile-desc">
                                                                Nh???p email v?? m???t kh???u c???a
                                                                b???n
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
                                                                        placeholder="M???t kh???u"
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

                                                                {/* {showErrorMessage && (
                                                                    <p
                                                                        style={{
                                                                            color: 'red',
                                                                            marginBottom:
                                                                                '10px',
                                                                        }}
                                                                    >
                                                                        T??i kho???n m???t kh???u
                                                                        kh??ng ch??nh x??c...
                                                                    </p>
                                                                )} */}

                                                                <button
                                                                    className="nav-btn-login-mobile"
                                                                    onClick={
                                                                        handleClickLogin
                                                                    }
                                                                    disabled={isFetching}
                                                                >
                                                                    ????ng nh???p
                                                                </button>

                                                                <div className="nav-more-info-mobile">
                                                                    <p className="nav-more-info-mobile-text">
                                                                        Kh??ch h??ng m???i?
                                                                        <Link
                                                                            className="nav-more-info-mobile"
                                                                            to="/confirm/register"
                                                                        >
                                                                            T???o t??i kho???n
                                                                        </Link>
                                                                    </p>

                                                                    <p className="nav-more-info-mobile-text">
                                                                        Qu??n m???t kh???u?
                                                                        <Link
                                                                            className="nav-more-info-mobile"
                                                                            to="/forgot-password"
                                                                        >
                                                                            Kh??i ph???c m???t
                                                                            kh???u
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
                                            to="/products"
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
                                    <ul className="nav-list">
                                        <li className="nav-item">
                                            <Link
                                                className="nav-menu-item-link"
                                                to="/products/TEE"
                                            >
                                                TEE
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-menu-item-link"
                                                to="/products/HOODIE"
                                            >
                                                HOODIE
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className="nav-menu-item-link"
                                                to="/products/POLO"
                                            >
                                                POLO
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link
                                                className="nav-menu-item-link"
                                                to="/products/SHORT"
                                            >
                                                SHORT
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="nav-menu" style={{ zIndex: '7' }}>
                                    <span className="nav-label">
                                        <Link className="navbar-menu-item-link" to="/">
                                            ki???m tra ????n h??ng
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
                                <Searchs />
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

// --------------- Ph???n search --------------------
// const [searchTerm, setSearchTerm] = useState('');
// const [listProduct, setListProduct] = useState([]);

// const handleSubmit = (e) => {
//     e.preventDefault();

//     setSearchTerm('');
// };

// useEffect(() => {
//     const showProduct = async () => {
//         try {
//             const res = await axios.get(
//                 'http://localhost:5000/api/search?search=' + searchTerm,
//             );
//             setListProduct(res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     showProduct();
// }, [searchTerm]);

// ----------------------------------------------------------------

// <div className="navbar-wrapper">
// <div className="navbar-left">
//     <Searchs />
// </div>

// <div className="navbar-center">
//     <Link to="/">
//         <img
//             className="navbar-header-img"
//             alt=""
//             src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
//         />
//     </Link>
// </div>
// <div className="navbar-right">
//     {user ? (
//         <>
//             <div className="navbar-user">
//                 <div className="navbar-user-img">
//                     <img
//                         className="navbar-img-avatar"
//                         src={
//                             user.img ||
//                             'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
//                         }
//                         alt=""
//                     />
//                     <span className="navbar-user-name">
//                         {user.username}
//                     </span>
//                 </div>
//                 <div className="navbar-list-info">
//                     <div
//                         className="navbar-info-user"
//                         style={{
//                             borderTopLeftRadius: '3px',
//                             borderTopRightRadius: '3px',
//                         }}
//                         onClick={profileUser}
//                     >
//                         T??i kho???n c???a t??i
//                     </div>
//                     <div
//                         className="navbar-info-user"
//                         style={{
//                             borderBottomLeftRadius: '3px',
//                             borderBottomRightRadius: '3px',
//                         }}
//                         onClick={handleLogout}
//                     >
//                         ????ng xu???t
//                     </div>
//                 </div>
//             </div>
//             {/* <LogOut to="/logout" onClick={handleLogout}>
//             LogOut
//         </LogOut> */}
//         </>
//     ) : (
//         <>
//             <Link
//                 // to="/register"
//                 to="/confirm/register"
//                 style={{ color: '#000', textDecoration: 'none' }}
//             >
//                 <div className="navbar-menu-item">REGISTER</div>
//             </Link>
//             <Link
//                 to="/login"
//                 style={{ color: '#000', textDecoration: 'none' }}
//             >
//                 <div className="navbar-menu-item">SIGN IN</div>
//             </Link>
//         </>
//     )}
//     {/* <Link to="/cart" onClick={handleClick}> */}
//     <Link onClick={handleClick}>
//         <div className="navbar-menu-item">
//             <Badge badgeContent={user && quantity} color="secondary">
//                 <ShoppingCart fontSize="large" />
//             </Badge>
//         </div>
//     </Link>
// </div>
// </div>
