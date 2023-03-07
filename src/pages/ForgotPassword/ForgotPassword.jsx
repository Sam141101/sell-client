import { KeyboardBackspace } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/NavBar/NavBar';
import { register } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import './forgotPassword.css';

const HeaderImg = styled.img`
    height: 38px;
    cursor: pointer;
`;

const HeaderTitle = styled.h2`
    font-size: 26px;
    padding-left: 25px;
`;

const HeaderHelp = styled.p`
    color: red;
    font-weight: 500;
    cursor: pointer;
`;

// --------------------------------------------------------------

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blurEmail = (e) => {
        // var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if (!e.target.value) {
        //     document.getElementById('email').innerHTML = 'Vui lòng nhập trường này';
        //     setConfirmEmail(false);
        // } else if (!regex.test(e.target.value)) {
        //     document.getElementById('email').innerHTML = 'Trường này phải là email';
        //     setConfirmEmail(false);
        // } else {
        //     document.getElementById('email').innerHTML = '';
        //     setConfirmEmail(true);
        //     document.getElementById('succes').innerHTML = '';
        // }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:5000/api/auth/forgot-password`;
            const { data: res } = await axios.post(url, { email });
            console.log('xác thực email');
            setMsg(res.message);
        } catch (error) {
            console.log('xác thực email thất bại');
            console.log(error);
        }
    };

    return (
        <>
            {/* <div>
                <div className="forgot-password-header">
                    <div className="forgot-password-header-container">
                        <Link to="/">
                            <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                        </Link>
                        <HeaderTitle>Đặt lại mật khẩu</HeaderTitle>
                    </div>
                    <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
                </div>
                <div className="forgot-password-container">
                    <div className="forgot-password-wrapper">
                        <div className="forgot-password-block-header">
                            <Link
                                to="/login"
                                style={{ textDecoration: 'none', color: 'red' }}
                            >
                                <KeyboardBackspace className="forgot-password-icon-left" />
                            </Link>
                            <h1 className="forgot-password-title">Quên mật khẩu</h1>
                        </div>
                        <div className="forgot-password-form">
                            <div className="forgot-password-form-input">
                                <input
                                    className="forgot-password-input"
                                    type="text"
                                    placeholder="Gmail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    onBlur={blurEmail}
                                />
                                {msg && (
                                    <span className="forgot-password-span" id="email">
                                        {msg}
                                    </span>
                                )}
                                <button
                                    className="forgot-password-button"
                                    style={{ marginTop: '30px' }}
                                    disabled={!email}
                                    onClick={handleClick}
                                >
                                    GỬI ĐI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="email-verify-frame">
                <Navbar />
                <div className="email-verify-main">
                    <div className="grid">
                        <div className="row">
                            <div className="col l-6 c-12">
                                <div className="email-verify-header">
                                    <h1 className="email-verify-title">Đăng nhập</h1>
                                </div>
                            </div>

                            <div className="col l-6 c-12">
                                <div className="email-verify-container">
                                    <div className="email-verify-wrapper">
                                        <div className="email-verify-form">
                                            {/* Email */}
                                            <div className="email-verify-form-input">
                                                <div className="forgot-password-title-text">
                                                    Phục hồi mật khẩu
                                                </div>
                                                <input
                                                    className="email-verify-input"
                                                    type="email"
                                                    placeholder="Gmail"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    value={email}
                                                    onBlur={blurEmail}
                                                    // ref={inputRef}
                                                />

                                                {msg && (
                                                    <span
                                                        className="email-verify-span"
                                                        id="email"
                                                    >
                                                        {msg}
                                                    </span>
                                                )}

                                                <div className="forgot-password-desc-police">
                                                    This site is protected by reCAPTCHA
                                                    and the Google
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

                                                <div className="forgot-password-buttons">
                                                    <button
                                                        className="email-verify-button"
                                                        disabled={!email}
                                                        onClick={handleClick}
                                                    >
                                                        Gửi
                                                    </button>

                                                    <Link
                                                        to="/login"
                                                        className="forgot-password-cancel"
                                                    >
                                                        Huỷ
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default ForgotPassword;
