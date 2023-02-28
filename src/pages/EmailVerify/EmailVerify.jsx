import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import './emailVerify.css';

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

const TextLine = styled.span`
    color: #ee4d2d;
    font-weight: 500;
    margin-left: 7px;
    cursor: pointer;
`;

// --------------------------------------------------------------

const EmailVerify = () => {
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
            const url = `http://localhost:5000/api/auth/confirm/register`;
            const { data: res } = await axios.post(url, { email });
            console.log('xác thực email');
            setMsg(res.message);
        } catch (error) {
            console.log('xác thực email thất bại');
        }
    };

    return (
        <div>
            {/* <div className="email-verify-header">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12">
                            <div className="email-verify-header-container">
                                <Link to="/">
                                    <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                                </Link>
                                <HeaderTitle>Đăng kí</HeaderTitle>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col l-12">
                            <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="email-verify-header">
                <div className="email-verify-header-container">
                    <Link to="/">
                        <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                    </Link>
                    <HeaderTitle>Đăng kí</HeaderTitle>
                </div>
                <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
            </div>

            <div className="email-verify-container">
                <div className="email-verify-wrapper">
                    <h1 className="email-verify-title" style={{ marginBottom: '30px' }}>
                        Đăng ký
                    </h1>
                    <div className="email-verify-form">
                        {/* Email */}
                        <div className="email-verify-form-input">
                            <input
                                className="email-verify-input"
                                type="text"
                                placeholder="Gmail"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                onBlur={blurEmail}
                            />
                            {msg && (
                                <span className="email-verify-span" id="email">
                                    {msg}
                                </span>
                            )}
                            <button
                                className="email-verify-button"
                                style={{ marginTop: '30px' }}
                                disabled={!email}
                                onClick={handleClick}
                            >
                                TIẾP THEO
                            </button>
                        </div>
                        <span className="email-verify-agreement">
                            Bằng cách tạo một tài khoản, tôi đồng ý với việc xử lý dữ liệu
                            cá nhân của mình theo
                            <b
                                style={{
                                    color: '#ee4d2d',
                                    fontSize: '11px',
                                    marginLeft: '3px',
                                }}
                            >
                                ĐIỀU KHOẢN DỊCH VỤ
                            </b>{' '}
                            &{' '}
                            <b style={{ color: '#ee4d2d', fontSize: '11px' }}>
                                CHÍNH SÁCH BẢO MẬT
                            </b>
                        </span>

                        <p className="email-verify-text">
                            Bạn đã có tài khoản?
                            <Link style={{ textDecoration: 'none' }} to="/login">
                                <TextLine>Đăng nhập</TextLine>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
