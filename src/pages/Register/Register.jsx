import { KeyboardBackspace, Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { register } from '../../redux/apiCalls';

import './register.css';
import { togglePasswordVisibility } from '../../support';

// --------------------------------------------------------------

const Register = ({ axios, BASE_URL_API, dispatch, navigate }) => {
    const [inputs, setInputs] = useState({});
    const [notify, setNotify] = useState('');

    // ------------- nhập gmail để tới bước tiếp theo ------
    const [userid, setUserid] = useState({});

    const [validUrl, setValidUrl] = useState(false);

    const param = useParams();

    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        let errorMessage = '';

        if (
            !inputs.username ||
            !inputs.fullname ||
            !inputs.gender ||
            !inputs.password ||
            !inputs.confirmPassword
        ) {
            errorMessage = 'Vui lòng điền đầy đủ thông tin cần thiết.';
        }

        if (inputs.username.length < 6 && inputs.username.trim()) {
            errorMessage = 'Tên tài khoản ít hơn 6 kí tự hoặc có khoảng trắng.';
        }

        if (inputs.password.length < 6) {
            errorMessage = 'Mật khẩu không được ít hơn 6 kí tự.';
        }

        if (inputs.password !== inputs.confirmPassword) {
            errorMessage = 'Mật khẩu không trùng khớp.';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        const inputss = {
            userid: userid.id,
            inputs,
        };
        register(dispatch, inputss, navigate, setNotify);
        // navigate('/login');
    };

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = BASE_URL_API + `auth/${param.id}/verify/${param.token}`;
                const res = await axios.get(url);
                setUserid(res.data.id);
                // console.log(data);
                setValidUrl(true);
            } catch (err) {
                console.log(err, 'từ email để vô đăng kí thất bại');
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            {validUrl ? (
                // <>
                <div className="register-main">
                    <div className="grid">
                        <div className="row">
                            <div className="col l-6 c-12">
                                <div className="register_header">
                                    <h1 className="register_title">Tạo tài khoản</h1>
                                </div>
                            </div>

                            <div className="col l-6 c-12">
                                <div className="register_container">
                                    <div className="register_wrapper">
                                        <div className="register_form">
                                            <div className="register_form-input">
                                                <input
                                                    className="register_input"
                                                    type="text"
                                                    placeholder="Họ và Tên"
                                                    name="fullname"
                                                    onChange={handleChange}
                                                />
                                                <div
                                                    className="register_form-gender"
                                                    onChange={handleChange}
                                                >
                                                    <input
                                                        className="register_form-value-select"
                                                        type="radio"
                                                        name="gender"
                                                        id="male"
                                                        value="Nam"
                                                    />
                                                    <label
                                                        className="register_form-value-label"
                                                        htmlFor="male"
                                                    >
                                                        Nam
                                                    </label>
                                                    <input
                                                        className="register_form-value-select"
                                                        type="radio"
                                                        name="gender"
                                                        id="female"
                                                        value="Nữ"
                                                    />
                                                    <label
                                                        className="register_form-value-label"
                                                        htmlFor="female"
                                                    >
                                                        Nữ
                                                    </label>
                                                    <input
                                                        className="register_form-value-select"
                                                        type="radio"
                                                        name="gender"
                                                        id="other"
                                                        value="Khác"
                                                    />
                                                    <label
                                                        className="register_form-value-label"
                                                        htmlFor="other"
                                                    >
                                                        Khác
                                                    </label>
                                                </div>

                                                <input
                                                    className="register_input"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Tài khoản"
                                                    onChange={handleChange}
                                                />

                                                <div className="block-register-input">
                                                    <input
                                                        className="register_input"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Mật khẩu"
                                                        onChange={handleChange}
                                                        id="password"
                                                    />

                                                    <Visibility
                                                        onClick={() =>
                                                            togglePasswordVisibility(
                                                                'password',
                                                            )
                                                        }
                                                        className="register-input-password-display"
                                                    />
                                                </div>

                                                <div className="block-register-input">
                                                    <input
                                                        className="register_input"
                                                        onChange={handleChange}
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Xác thực mật khẩu"
                                                        id="password-confirm"
                                                    />

                                                    <Visibility
                                                        onClick={() =>
                                                            togglePasswordVisibility(
                                                                'password-confirm',
                                                            )
                                                        }
                                                        className="register-input-password-display"
                                                    />
                                                </div>

                                                <span className="notify-info-message">
                                                    {notify}
                                                </span>

                                                <button
                                                    className="register_button"
                                                    onClick={handleClick}
                                                >
                                                    ĐĂNG KÝ
                                                </button>
                                            </div>

                                            <span className="register_agreement">
                                                Bằng cách tạo một tài khoản, tôi đồng ý
                                                với việc xử lý dữ liệu cá nhân của mình
                                                theo
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

                                            <p className="register_text">
                                                Bạn đã có tài khoản?
                                                <Link
                                                    style={{ textDecoration: 'none' }}
                                                    to="/login"
                                                >
                                                    <span className="register_text-line">
                                                        Đăng nhập
                                                    </span>
                                                </Link>
                                            </p>

                                            <Link to="/" className="register_return-home">
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
            ) : (
                // </>
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default Register;
