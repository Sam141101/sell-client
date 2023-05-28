import { KeyboardBackspace } from '@mui/icons-material';
// import axios from 'axios';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// import { BASE_URL_API } from '../../requestMethods';
import './newPassword.css';

// --------------------------------------------------------------

const NewPassword = ({ axios, BASE_URL_API, navigate }) => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [msg, setMsg] = useState('');

    const [validUrl, setValidUrl] = useState(false);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const param = useParams();

    const handleClick = async (e) => {
        e.preventDefault();

        let errorMessage = '';
        if (!password || !passwordConfirm) {
            errorMessage = 'Vui lòng điền đầy đủ thông tin cần thiết.';
        }

        if (password.length < 6) {
            errorMessage = 'Mật khẩu không được ít hơn 6 kí tự.';
        }

        if (password !== passwordConfirm) {
            errorMessage = 'Mật khẩu không trùng khớp.';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        console.log(password, passwordConfirm);
        try {
            const url = BASE_URL_API + `auth/new-password`;
            const res = await axios.post(url, {
                password: password,
                passwordConfirm: passwordConfirm,
                id: id,
            });
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
                const url =
                    BASE_URL_API + `auth/reset-password/${param.id}/${param.token}`;
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
