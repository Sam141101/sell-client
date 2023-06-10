import React, { useState, useEffect, useRef } from 'react';
import {
    AccountCircle,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Mail,
    Menu,
    Phone,
    ShoppingCart,
} from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCart, login, logout } from '../../redux/apiCalls';
import Searchs from '../Searchs/Searchs';
import { resetProduct } from '../../redux/cartRedux';
import './navBar.css';
import { listFunctions, listInfoMobile, listItemNavBar, listNavPc } from '../../data';
import FormLoginMobile from '../FormLoginMobile/FormLoginMobile';
import { formatMoney } from '../../support';

// const Navbar = React.memo(({axiosJWT ,quantity}) => {
const Navbar = ({ axiosJWT, quantity, user, navigate, dispatch }) => {
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const accessToken = user?.token;
    const id = user?._id;

    const handleClick = (name) => {
        console.log('name--', name, typeof name);
        const action = document.querySelector('.nav-menu-user-mobile');
        const action1 = document.querySelector('.nav-menu-mobile');
        action.classList.remove('actived');
        action1.classList.remove('actived');
        document.body.style.overflow = 'auto';
        if (name === 'cart') {
            if (!user) {
                navigate('/login');
            } else {
                navigate(`/${name}`);
            }
        } else {
            console.log('dddd', `/${name}`);
            navigate(`/${name}`);
        }
    };

    // Logout

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch, id, accessToken, axiosJWT, navigate);
        resetProduct();
    };

    useEffect(() => {
        const getCart = () => {
            if (user && user?.token) {
                getAllCart(user.token, dispatch, user._id, axiosJWT);
                console.log('getCart');
            }
        };
        getCart();
    }, [dispatch, user]);

    //login
    const { isFetching } = useSelector((state) => state?.auth);

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
    };

    const changeInputUserName = (e) => {
        setUsername(e.target.value);
    };

    const changeInputPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleMenuClick = (e, buttonType) => {
        e.preventDefault();
        const action1 = document.querySelector('.nav-menu-mobile');
        const action = document.querySelector('.nav-menu-user-mobile');
        const list1 = document.querySelector('#list1');
        const list0 = document.querySelector('#list0');
        const list2 = document.querySelector('#list2');
        const list3 = document.querySelector('#list3');

        if (buttonType !== 'More') {
            if (buttonType === 'Menu') {
                action1.classList.toggle('actived');
                action.classList.remove('actived');
                if (action1.classList.contains('actived')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            } else if (buttonType === 'User') {
                action.classList.toggle('actived');
                action1.classList.remove('actived');

                if (action.classList.contains('actived')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }

            list1.classList.remove('selected1');
            list0.classList.remove('shop0');
            list2.classList.remove('selected2');
            list3.classList.remove('selected3');
        } else {
            const taked = e.target.id;
            console.log(taked);
            switch (taked) {
                case 'click0':
                    list1.classList.add('selected1');
                    list0.classList.add('shop0');
                    break;
                case 'return0':
                    list1.classList.remove('selected1');
                    list0.classList.remove('shop0');
                    break;
                case 'click1':
                    list2.classList.add('selected2');
                    break;
                case 'return1':
                    list2.classList.remove('selected2');
                    break;
                case 'click2':
                    list3.classList.add('selected3');
                    break;
                case 'return2':
                    list3.classList.remove('selected3');
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="frame-navbar">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12 c-12">
                        <div className="navbar-container df ai">
                            {/* Mobile */}
                            <div className="nav-block df ai w100pt">
                                <div className="navbar-mobile-left">
                                    <Menu
                                        className="mobile-icon cs menu"
                                        onClick={(e) => handleMenuClick(e, 'Menu')}
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
                                                    {listInfoMobile.map((item, index) => (
                                                        <li
                                                            className="nav-menu-list-item-mobile"
                                                            key={index}
                                                        >
                                                            <Link
                                                                className="navbar-menu-item-link fz16 fw600 tx-tran df ai"
                                                                to={item.to}
                                                                id={
                                                                    item.noLink === false
                                                                        ? 'click0'
                                                                        : undefined
                                                                }
                                                                onClick={
                                                                    item.noLink === false
                                                                        ? (e) =>
                                                                              handleMenuClick(
                                                                                  e,
                                                                                  'More',
                                                                              )
                                                                        : null
                                                                }
                                                            >
                                                                {item.title}
                                                                {item.noLink ===
                                                                    false && (
                                                                    <KeyboardArrowRight className="navbar-menu-item-more" />
                                                                )}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="nav-list-help-mobile">
                                                    <p className="nav-list-help-title-mobile">
                                                        Bạn cần hỗ trợ?
                                                    </p>
                                                    <div className="nav-list-contact-mobile">
                                                        <Phone className="nav-list-help-icon-mobile fz16" />
                                                        <p className="nav-list-help-text-mobile">
                                                            Liên hệ: 0862642568
                                                        </p>
                                                    </div>
                                                    <div className="nav-list-contact-mobile">
                                                        <Mail className="nav-list-help-icon-mobile fz16" />
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
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai return five "
                                                            id="return0"
                                                            onClick={(e) =>
                                                                handleMenuClick(e, 'More')
                                                            }
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai text-inherit"
                                                            to={`/products/all?page=${1}`}
                                                            onClick={() =>
                                                                handleClick(
                                                                    `products/all?page=${1}`,
                                                                )
                                                            }
                                                        >
                                                            Xem tất cả "Shop"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            // to="/"
                                                            id="click1"
                                                            onClick={(e) =>
                                                                handleMenuClick(e, 'More')
                                                            }
                                                        >
                                                            - TOPS
                                                            <KeyboardArrowRight className="navbar-menu-item-more" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            id="click2"
                                                            onClick={(e) =>
                                                                handleMenuClick(e, 'More')
                                                            }
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
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai return five"
                                                            id="return1"
                                                            onClick={(e) =>
                                                                handleMenuClick(e, 'More')
                                                            }
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link className="navbar-menu-item-link fz16 fw600 tx-tran df ai text-inherit">
                                                            Xem tất cả "TOPS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <div
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    `products/TEE?page=${1}`,
                                                                )
                                                            }
                                                        >
                                                            - TEE
                                                        </div>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <div
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    `products/POLO?page=${1}`,
                                                                )
                                                            }
                                                        >
                                                            - POLO
                                                        </div>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <div
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    `products/HOODIE?page=${1}`,
                                                                )
                                                            }
                                                        >
                                                            - HOODIE
                                                        </div>
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
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai return five "
                                                            id="return2"
                                                            onClick={(e) =>
                                                                handleMenuClick(e, 'More')
                                                            }
                                                        >
                                                            <KeyboardArrowLeft className="navbar-menu-item-more return" />
                                                            Quay về
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <Link className="navbar-menu-item-link fz16 fw600 tx-tran df ai text-inherit">
                                                            Xem tất cả "BOTTOMS"
                                                        </Link>
                                                    </li>
                                                    <li className="nav-menu-list-item-mobile">
                                                        <div
                                                            className="navbar-menu-item-link fz16 fw600 tx-tran df ai four"
                                                            onClick={(e) =>
                                                                handleClick(
                                                                    `products/SHORT?page=${1}`,
                                                                )
                                                            }
                                                        >
                                                            - SHORT
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>

                                <div className="navbar-center df ai h100pt">
                                    <div onClick={(e) => handleClick('')}>
                                        <img
                                            className="navbar-header-img cs"
                                            height="32px"
                                            width="197px"
                                            alt=""
                                            src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
                                        />
                                    </div>
                                </div>

                                <div className="navbar-right df ai h100pt">
                                    {user ? (
                                        <>
                                            <div className="hide-on-mobile">
                                                <div className="navbar-user">
                                                    <div className="navbar-user-img df ai">
                                                        <img
                                                            className="navbar-img-avatar cs bd50pt"
                                                            src={
                                                                user.img ||
                                                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                                            }
                                                            alt=""
                                                        />
                                                        <span className="navbar-user-name fz15 fw500">
                                                            {user.username}
                                                        </span>
                                                    </div>
                                                    <div className="navbar-list-info fz15 fw500 ">
                                                        {listFunctions.map(
                                                            (item, index) => (
                                                                <div key={index}>
                                                                    {item.noLink ===
                                                                    true ? (
                                                                        <Link
                                                                            className={`navbar-info-user db cs ${
                                                                                item.title ===
                                                                                'Tài khoản của tôi'
                                                                                    ? 'border-top'
                                                                                    : ''
                                                                            }`}
                                                                            to={`/${item.to}`}
                                                                        >
                                                                            {item.title}
                                                                        </Link>
                                                                    ) : (
                                                                        <div
                                                                            className={`navbar-info-user cs ${
                                                                                item.title ===
                                                                                'Đăng xuất'
                                                                                    ? 'border-bottom'
                                                                                    : ''
                                                                            }`}
                                                                            onClick={
                                                                                handleLogout
                                                                            }
                                                                        >
                                                                            Đăng xuất
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mobile-user">
                                                <AccountCircle
                                                    className="mobile-icon cs"
                                                    onClick={(e) =>
                                                        handleMenuClick(e, 'User')
                                                    }
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
                                                        <div className="nav-info-user-mobile-title fz16 fw500 tx-tran">
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
                                                                    {user.username}
                                                                </span>
                                                            </li>

                                                            {listFunctions.map(
                                                                (item, index) => (
                                                                    <li
                                                                        className="nav-info-user-mobile-list-item"
                                                                        key={index}
                                                                    >
                                                                        <div
                                                                            onClick={
                                                                                item.noLink ===
                                                                                true
                                                                                    ? (
                                                                                          e,
                                                                                      ) =>
                                                                                          handleClick(
                                                                                              item.to,
                                                                                          )
                                                                                    : (
                                                                                          e,
                                                                                      ) =>
                                                                                          handleLogout(
                                                                                              e,
                                                                                          )
                                                                            }
                                                                            className="nav-info-user-mobile-list-item-link"
                                                                        >
                                                                            {item.title}
                                                                        </div>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="hide-on-mobile">
                                                <div className="pc-user df">
                                                    <Link
                                                        to="/confirm/register"
                                                        style={{
                                                            color: '#000',
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <div className="navbar-menu-item fz15 cs">
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
                                                        <div className="navbar-menu-item fz15 cs">
                                                            Đăng nhập
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mobile-user">
                                                <AccountCircle
                                                    className="mobile-icon cs"
                                                    onClick={(e) =>
                                                        handleMenuClick(e, 'User')
                                                    }
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
                                                        <FormLoginMobile
                                                            inputRef1={inputRef1}
                                                            changeInputUserName={
                                                                changeInputUserName
                                                            }
                                                            changeInputPassword={
                                                                changeInputPassword
                                                            }
                                                            inputRef2={inputRef2}
                                                            isFetching={isFetching}
                                                            handleClickLogin={
                                                                handleClickLogin
                                                            }
                                                            handleClick={handleClick}
                                                        />
                                                    </div>
                                                </nav>
                                            </div>
                                        </>
                                    )}

                                    <div onClick={(e) => handleClick('cart')}>
                                        <div className="navbar-menu-item fz15 cs">
                                            <Badge
                                                badgeContent={user && quantity}
                                                color="secondary"
                                                className="mobile-cart-number"
                                            >
                                                <ShoppingCart
                                                    style={{ color: 'black' }}
                                                    fontSize="large"
                                                    className="mobile-icon cs"
                                                />
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ------ */}
                        </div>
                    </div>
                </div>

                {/* PC || LAPTOP */}
                <div className="navbar-menu">
                    <div className="row">
                        <div className="col l-7 c-0">
                            <div className="nav-list-mobile df hide-on-mobile">
                                {listNavPc.map((item, index) => (
                                    <div className="nav-menu" key={index}>
                                        <span className="nav-label">
                                            <Link
                                                className="navbar-menu-item-link fz16 fw600 tx-tran df ai"
                                                to={item.to}
                                            >
                                                {item.title}
                                                {item.title === 'Shop' && (
                                                    <span
                                                        style={{
                                                            marginLeft: '3px',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        &#9662;
                                                    </span>
                                                )}
                                            </Link>
                                        </span>
                                        <div className="line"></div>
                                        {item.title === 'Shop' && (
                                            <ul className="nav-list">
                                                {listItemNavBar.map((item, index) => (
                                                    <li key={index} className="nav-item">
                                                        <Link
                                                            className="nav-menu-item-link db fz16"
                                                            to={item.to}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col l-5 c-12">
                            <div className="navbar-left df ai h100pt">
                                <Searchs formatMoney={formatMoney} navigate={navigate} />
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
