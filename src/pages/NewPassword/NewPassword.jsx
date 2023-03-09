import { KeyboardBackspace } from '@mui/icons-material';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import './newPassword.css';

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

const NewPassword = () => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [msg, setMsg] = useState('');
    const [validUrl, setValidUrl] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const param = useParams();

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
            const url = `http://localhost:5000/api/auth/new-password`;
            const res = await axios.post(url, { password: password, id: id });
            // console.log(res.data.message);
            console.log('cập nhật mật khẩu thành công');
            setMsg(res.data.message);
            navigate('/login');
        } catch (error) {
            console.log('cập nhật mật khẩu thất bại');
            console.log(error);
        }
    };

    useEffect(() => {
        const resetPassword = async () => {
            try {
                const url = `http://localhost:5000/api/auth/reset-password/${param.id}/${param.token}`;
                const res = await axios.get(url);
                setEmail(res.data.email);
                setId(res.data.id);
                console.log(res.data);

                setValidUrl(true);
            } catch (err) {
                console.log(err, 'từ email để vô đăng kí thất bại');
                setValidUrl(false);
            }
        };
        resetPassword();
    }, [param]);

    return (
        <>
            {validUrl ? (
                <>
                    <div className="login_main">
                        <div className="grid">
                            <div className="row">
                                <div className="col l-6 c-12">
                                    <div className="login_header">
                                        <h1 className="login_title">Đăng nhập</h1>
                                    </div>
                                </div>

                                <div className="col l-6 c-12">
                                    <div className="login_container">
                                        <div className="login_wrapper">
                                            <div className="login_form">
                                                <div className="forgot-password-title-text">
                                                    Mật khẩu mới
                                                </div>

                                                {/* Email */}
                                                <div className="title-email-user">
                                                    {email}
                                                </div>

                                                <div className="login_form-input">
                                                    <input
                                                        className="login_input"
                                                        type="text"
                                                        ref={inputRef1}
                                                        placeholder="Mật khẩu mới"
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                        value={password}
                                                        // onBlur={blurEmail}
                                                    />

                                                    <span
                                                        className="login_span"
                                                        id="username"
                                                    ></span>

                                                    <input
                                                        className="login_input"
                                                        placeholder="Nhập lại mật khẩu"
                                                        type="text"
                                                        value={passwordConfirm}
                                                        ref={inputRef2}
                                                        onChange={(e) =>
                                                            setPasswordConfirm(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className="login_span"
                                                        id="password"
                                                    ></span>

                                                    {msg && (
                                                        <span
                                                            className="new-password-span"
                                                            id="email"
                                                        >
                                                            {msg}
                                                        </span>
                                                    )}

                                                    <button
                                                        className="login_button"
                                                        // disabled={isFetching}
                                                        onClick={handleClick}
                                                    >
                                                        ĐỒNG Ý
                                                    </button>
                                                </div>

                                                <Link
                                                    to="/"
                                                    className="register_return-home large"
                                                >
                                                    <KeyboardBackspace className="register_return-home-icon" />
                                                    <p className="register_return-home-text">
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
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default NewPassword;
