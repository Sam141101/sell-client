import React, { useState, useEffect } from 'react';
import { Close, Search, ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';

import { mobile } from '../../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCart, logout } from '../../redux/apiCalls';
import { createAxios } from '../../createInstance';
import { loginSuccess, logoutSuccess } from '../../redux/authRedux';
import axios from 'axios';
import Searchs from '../Searchs/Searchs';
import { resetProduct } from '../../redux/cartRedux';
import './navBar.css';

const Navbar = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);

    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                getAllCart(user.token, dispatch, user._id);
            }
        };
        getCart();
    }, [dispatch, user]);

    return (
        <div className="frame-navbar">
            {/* <div className="navbar-container" style={{ marginTop: '12px' }}> */}
            <div className="navbar-container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-5">
                            <div className="navbar-left">
                                <Searchs />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="navbar-center">
                                <Link to="/">
                                    <img
                                        className="navbar-header-img"
                                        alt=""
                                        src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col l-4">
                            <div className="navbar-right">
                                {user ? (
                                    <>
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
                                                        borderTopLeftRadius: '3px',
                                                        borderTopRightRadius: '3px',
                                                    }}
                                                    onClick={profileUser}
                                                >
                                                    Tài khoản của tôi
                                                </div>
                                                <div
                                                    className="navbar-info-user"
                                                    style={{
                                                        borderBottomLeftRadius: '3px',
                                                        borderBottomRightRadius: '3px',
                                                    }}
                                                    onClick={handleLogout}
                                                >
                                                    Đăng xuất
                                                </div>
                                            </div>
                                        </div>
                                        {/* <LogOut to="/logout" onClick={handleLogout}>
                                LogOut
                            </LogOut> */}
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                                {/* <Link to="/cart" onClick={handleClick}> */}
                                <Link onClick={handleClick}>
                                    <div className="navbar-menu-item">
                                        <Badge
                                            badgeContent={user && quantity}
                                            color="secondary"
                                        >
                                            <ShoppingCart fontSize="large" />
                                        </Badge>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar-menu">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12">
                            <ul className="navbar-menu-list">
                                <li className="navbar-menu-list-item">
                                    <Link className="navbar-menu-item-link" to="/">
                                        HOME
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link
                                        className="navbar-menu-item-link"
                                        to="/products"
                                    >
                                        TẤT CẢ SẢN PHẨM
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link className="navbar-menu-item-link" to="/">
                                        SẢN PHẨM MỚI
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link
                                        className="navbar-menu-item-link"
                                        to="/products/TEE"
                                    >
                                        TEE
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link
                                        className="navbar-menu-item-link"
                                        to="/products/HOODIE"
                                    >
                                        HOODIE
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link
                                        className="navbar-menu-item-link"
                                        to="/products/POLO"
                                    >
                                        POLO
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link
                                        className="navbar-menu-item-link"
                                        to="/products/SHORT"
                                    >
                                        SHORT
                                    </Link>
                                </li>

                                <li className="navbar-menu-list-item">
                                    <Link className="navbar-menu-item-link" to="/">
                                        ABOUT
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

// --------------- Phần search --------------------
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
//                         Tài khoản của tôi
//                     </div>
//                     <div
//                         className="navbar-info-user"
//                         style={{
//                             borderBottomLeftRadius: '3px',
//                             borderBottomRightRadius: '3px',
//                         }}
//                         onClick={handleLogout}
//                     >
//                         Đăng xuất
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
