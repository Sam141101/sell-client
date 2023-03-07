import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/NavBar/NavBar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
`;

const Wrapper = styled.div`
    background-color: white;
    padding: 20px;
    width: 25%;
    border-radius: 6px;
    ${mobile({
        width: '75%',
    })}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`;
const Form = styled.div`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    font-weight: 500;
    border-radius: 3px;
    margin-top: 20px;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Link1 = styled.p`
    margin: 5px 0;
    font-size: 14px;
    cursor: pointer;
    color: red;
`;

const Link2 = styled.p`
    margin: 5px 0;
    font-size: 12px;
    cursor: pointer;
    color: #05a;
`;

const Error = styled.span`
    color: red;
`;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background: white;
    width: 100%;
    height: 75px;
    align-items: center;
    justify-content: space-between;
    padding: 0 275px;
`;

const HeaderContai = styled.div`
    display: flex;
    align-items: center;
`;

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

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { isFetching, error } = useSelector(
    //     (state) =>
    //         // state.user?.login || { currentUser: null, isFetching: false, error: false },
    //         state?.user,
    // );

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     // e.stopPropagation();
    //     // login(dispatch, { username, password });

    //     // test
    //     login(dispatch, { username, password }, navigate);
    // };

    // test
    const { isFetching, error } = useSelector((state) => state?.auth);

    const handleClick = (e) => {
        e.preventDefault();
        if (username === '') {
            inputRef1.current.focus();
        } else if (password === '') {
            inputRef2.current.focus();
        } else {
            // console.log('kkkkk  ');
            login(dispatch, { username, password }, navigate);
        }
    };
    //

    return (
        <>
            {/* <div>
                <div className="login_header">
                    <div className="login_header-container">
                        <Link to="/">
                            <img
                                className="login_header-img"
                                alt="Login"
                                src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
                            />
                        </Link>
                        <h2 className="login_header-title">Đăng nhập</h2>
                    </div>
                    <p className="login_header-help">Bạn cần giúp đỡ ?</p>
                </div>

                <div className="login_container">
                    <div className="login_wrapper">
                        <h1 className="login_title">Đăng nhập</h1>
                        <div className="login_form">
                            <input
                                className="login_input"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="login_input"
                                placeholder="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="login_button"
                                onClick={handleClick}
                                disabled={isFetching}
                            >
                                ĐĂNG NHẬP
                            </button>
                            {error && (
                                <span className="login_error">
                                    Tài khoản mật khẩu không chính xác...
                                </span>
                            )}
                            <div
                                style={{
                                    marginTop: '5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Link
                                    to="/forgot-password"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <p className="login_link2">Quên mật khẩu</p>
                                </Link>
                                <Link
                                    to="/confirm/register"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <p className="login_link1">Đăng kí</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="login_frame">
                <Navbar />
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
                                            {/* Email */}
                                            <div className="login_form-input">
                                                {error && (
                                                    <span className="login_error">
                                                        Yêu cầu không hợp lệ, hoặc quá
                                                        hạn, phiền bạn thử lại
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
                                                    className="login_button"
                                                    onClick={handleClick}
                                                    disabled={isFetching}
                                                >
                                                    ĐĂNG NHẬP
                                                </button>
                                                {/* <Button onClick={handleClick}>LOGIN</Button> */}
                                                {/* {error && (
                                                    <span className="login_error">
                                                        Yêu cầu không hợp lệ, hoặc quá
                                                        hạn, phiền bạn thử lại
                                                    </span>
                                                )} */}
                                            </div>

                                            <span className="login_agreement">
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

                                            <p className="login_text">
                                                Bạn đã có tài khoản?
                                                <Link
                                                    style={{ textDecoration: 'none' }}
                                                    to="/login"
                                                >
                                                    <span className="login_text-line">
                                                        Đăng nhập
                                                    </span>
                                                </Link>
                                            </p>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                {/* {validUrl ? (
                <>
                </>
            ) : (
                <h1>404 Not Found</h1>
            )} */}
            </div>
        </>
    );
};

export default Login;
