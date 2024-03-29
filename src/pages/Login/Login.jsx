import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { Link } from 'react-router-dom';
import './login.css';

const Login = ({ navigate, dispatch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    // test
    const { isFetching } = useSelector((state) => state?.auth);

    const handleClick = (e) => {
        e.preventDefault();

        if (username === '') {
            inputRef1.current.focus();
        } else if (password === '') {
            inputRef2.current.focus();
        } else {
            login(dispatch, { username, password }, navigate);
        }
    };

    return (
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
                                        {/* Email */}
                                        <div className="login_form-input df flex-direction">
                                            {!isFetching && (
                                                <span className="login_error">
                                                    Yêu cầu không hợp lệ, hoặc quá hạn,
                                                    phiền bạn thử lại
                                                </span>
                                            )}
                                            <input
                                                className="login_input"
                                                type="text"
                                                placeholder="username"
                                                ref={inputRef1}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                            <span
                                                className="login_span"
                                                id="username"
                                            ></span>
                                            <input
                                                className="login_input"
                                                placeholder="password"
                                                type="password"
                                                ref={inputRef2}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                            <span
                                                className="login_span"
                                                id="password"
                                            ></span>
                                            <button
                                                className="login_button out dib cs"
                                                onClick={handleClick}
                                                disabled={isFetching}
                                            >
                                                ĐĂNG NHẬP
                                            </button>
                                        </div>

                                        <span className="login_agreement">
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

                                        <p className="login_text">
                                            Bạn đã có tài khoản?
                                            <Link
                                                style={{ textDecoration: 'none' }}
                                                to="/confirm/register"
                                            >
                                                <span className="login_text-line fw500 cs">
                                                    Đăng kí
                                                </span>
                                            </Link>
                                            or
                                            <Link
                                                className="forgot-pass-title"
                                                to="/forgot-password"
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </p>
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

export default Login;
