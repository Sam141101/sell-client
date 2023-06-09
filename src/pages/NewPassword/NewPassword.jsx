import { KeyboardBackspace } from '@mui/icons-material';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// --------------------------------------------------------------

const NewPassword = ({ axios, BASE_URL_API, navigate, setToast }) => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // const [msg, setMsg] = useState('');

    const [validUrl, setValidUrl] = useState(false);

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const param = useParams();

    const handleClick = async (e) => {
        e.preventDefault();

        let errorMessage = '';
        if (!password || !passwordConfirm) {
            errorMessage = 'Vui lòng điền đầy đủ thông tin cần thiết.';
        } else if (password.length < 6) {
            errorMessage = 'Mật khẩu không được ít hơn 6 kí tự.';
        } else if (password !== passwordConfirm) {
            errorMessage = 'Mật khẩu không trùng khớp.';
        }

        if (errorMessage) {
            setToast({
                show: true,
                title: errorMessage,
                type: 'info',
                duration: 1200,
            });
            return;
        }

        // console.log(password, passwordConfirm);
        try {
            const url = BASE_URL_API + `auth/new-password`;
            const res = await axios.post(url, {
                password: password,
                passwordConfirm: passwordConfirm,
                id: id,
            });
            // console.log(res.data.message);
            // console.log('cập nhật mật khẩu thành công');
            // setMsg(res.data.message);
            setToast({
                show: true,
                title: res.data.message,
                type: 'success',
                duration: 1200,
            });
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
                                    <div className="login_header df ai jc">
                                        <h1 className="login_title">Đăng nhập</h1>
                                    </div>
                                </div>

                                <div className="col l-6 c-12">
                                    <div className="login_container df jc">
                                        <div className="login_wrapper">
                                            <div className="login_form">
                                                <div className="forgot-password-title-text">
                                                    Mật khẩu mới
                                                </div>

                                                <div className="title-email-user">
                                                    {email}
                                                </div>

                                                <div className="login_form-input df flex-direction">
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

                                                    <button
                                                        className="login_button out dib cs"
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
