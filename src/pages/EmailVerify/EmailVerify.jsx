import { KeyboardBackspace } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL_API } from '../../requestMethods';
import './emailVerify.css';

// --------------------------------------------------------------

const EmailVerify = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        let errorMessage = '';
        if (!email) {
            errorMessage = 'Vui lòng nhập Email.';
        }

        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)) {
            errorMessage = 'Email không hợp lệ!';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        try {
            const url = BASE_URL_API + `auth/confirm/register`;
            const { data: res } = await axios.post(url, { email });
            console.log('xác thực email');
            setMsg(res.message);
        } catch (error) {
            console.log('xác thực email thất bại');
        }
    };

    return (
        <>
            <div className="email-verify-main">
                <div className="grid">
                    <div className="row">
                        <div className="col l-6 c-12">
                            <div className="email-verify-header">
                                <h1 className="email-verify-title">Tạo tài khoản</h1>
                            </div>
                        </div>

                        <div className="col l-6 c-12">
                            <div className="email-verify-container">
                                <div className="email-verify-wrapper">
                                    <div className="email-verify-form">
                                        {/* Email */}
                                        <div className="email-verify-form-input">
                                            <input
                                                className="email-verify-input"
                                                type="email"
                                                placeholder="Gmail"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                // onBlur={blurEmail}
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
                                            <button
                                                className="email-verify-button"
                                                style={{ marginTop: '30px' }}
                                                // disabled={!email}
                                                onClick={handleClick}
                                            >
                                                TIẾP THEO
                                            </button>
                                        </div>
                                        <span className="email-verify-agreement">
                                            Bằng cách tạo một tài khoản, tôi đồng ý với
                                            việc xử lý dữ liệu cá nhân của mình theo
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
                                            <b
                                                style={{
                                                    color: '#ee4d2d',
                                                    fontSize: '11px',
                                                }}
                                            >
                                                CHÍNH SÁCH BẢO MẬT
                                            </b>
                                        </span>

                                        <p className="email-verify-text">
                                            Bạn đã có tài khoản?
                                            <Link
                                                style={{ textDecoration: 'none' }}
                                                to="/login"
                                            >
                                                <span className="email-verify-text-line">
                                                    Đăng nhập
                                                </span>
                                            </Link>
                                        </p>

                                        <Link to="/" className="email-verify-return-home">
                                            <KeyboardBackspace className="email-verify-return-home-icon" />
                                            <p className="email-verify-return-home-text">
                                                Quay lại trang chủ
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerify;
