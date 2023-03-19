import React, { useState, useEffect } from 'react';
import { Close, Create, Person, Search, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Announcement from '../../components/Announcement/Announcement';
import Navbar from '../../components/NavBar/NavBar';
import app from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import './changePassword.css';
import Footer from '../../components/Footer/Footer';
import { BASE_URL_API } from '../../requestMethods';
// import app from '../firebase'

const ChangePassword = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        // setShow(true);
        // setTimeout(() => {
        //     setShow(false);
        // }, 3000);

        try {
            const url = BASE_URL_API + `auth/change-password/${user._id}`;
            const res = await axios.post(
                url,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            // console.log(res.data.message);
            console.log('cập nhật mật khẩu thành công');
            // setMsg(res.data.message);
            // navigate('/login');
        } catch (error) {
            console.log('cập nhật mật khẩu thất bại');
            console.log(error);
        }
    };

    return (
        // <div style={{ backgroundColor: '#f5f5f5', height: '100vh' }}>
        <div>
            <div className="change-password-background">
                {show && (
                    <div className="change-password-wrapper">
                        <div className="change-password-noti">
                            <img
                                className="change-password-noti-img"
                                src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                                alt=""
                            />

                            <p className="change-password-text-noti">Cập nhật hồ sơ</p>
                        </div>
                    </div>
                )}

                <Navbar />

                <div className="change-password-container">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col l-4 c-12">
                                <div className="change-password-container-left">
                                    <div className="change-password-info-user">
                                        <img
                                            className="change-password-img-user"
                                            src={
                                                user.img ||
                                                'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                            }
                                            alt=""
                                        />
                                        <div className="change-password-change-info-user">
                                            <h4 className="change-password-title-user">
                                                {user.username}
                                            </h4>
                                            <span className="change-password-change-info">
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

                                    <div className="change-password-more-item">
                                        <div className="change-password-item">
                                            <img
                                                className="change-password-img-item"
                                                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                                                alt=""
                                            />
                                            Tài khoản của tôi
                                        </div>
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to="/wait-for-confirmation"
                                        >
                                            <div className="change-password-item">
                                                <img
                                                    className="change-password-img-item"
                                                    src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                                                    alt=""
                                                />
                                                Đơn mua
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col l-8 c-12">
                                <div className="change-password-container-right">
                                    <div className="change-password-manage-user">
                                        <h4 className="change-password-file-title">
                                            Hồ Sơ Của Tôi
                                        </h4>
                                        <p>
                                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                                        </p>
                                    </div>

                                    <div className="change-password-form">
                                        <div className="change-password-form-left">
                                            <div className="change-password-form-item">
                                                <div className="change-password-form-key">
                                                    Mật khẩu cũ
                                                </div>
                                                <div className="change-password-form-value">
                                                    <input
                                                        className="change-password-form-input"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setCurrentPassword(
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={currentPassword}
                                                    />
                                                </div>
                                            </div>

                                            <div className="change-password-form-item">
                                                <div className="change-password-form-key">
                                                    Mật khẩu mới
                                                </div>
                                                <div className="change-password-form-value">
                                                    <input
                                                        className="change-password-form-input"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setNewPassword(e.target.value)
                                                        }
                                                        value={newPassword}
                                                    />
                                                </div>
                                            </div>

                                            <div className="change-password-form-item">
                                                <div className="change-password-form-key">
                                                    Xác nhận mật khẩu
                                                </div>
                                                <div className="change-password-form-value">
                                                    <input
                                                        className="change-password-form-input"
                                                        type="text"
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={confirmPassword}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                className="change-password-form-save-info"
                                                onClick={handleClick}
                                            >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default ChangePassword;
