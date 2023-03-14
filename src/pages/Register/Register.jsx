import { KeyboardBackspace } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/NavBar/NavBar';
import { register } from '../../redux/apiCalls';
import { BASE_URL_API } from '../../requestMethods';
import { mobile } from '../../responsive';
import './register.css';

// --------------------------------------------------------------

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [succesPw, setSuccesPw] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmName, setConfirmName] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [confirmSuccessPassword, setConfirmSuccessPassword] = useState(false);

    // ------------- nhập gmail để tới bước tiếp theo ------
    const [userid, setUserid] = useState({});
    const [gmail, setGmail] = useState('');
    const confirm = true;

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        // register(dispatch, { username, password, email }, navigate);
        register(dispatch, { username, password, userid }, navigate);

        // navigate('/login');
    };

    const blurUsername = (e) => {};

    const blurEmail = (e) => {};

    const blurPassword = (e) => {};
    const blurConfirmPassword = (e) => {};

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
                                            {/* Email */}
                                            <div className="register_form-input">
                                                <input
                                                    className="register_input"
                                                    // value={username}
                                                    type="text"
                                                    placeholder="Họ và Tên"
                                                    // onChange={(e) =>
                                                    //     setUsername(e.target.value)
                                                    // }
                                                    // onBlur={blurUsername}
                                                />
                                                <span
                                                    className="register_span"
                                                    id="username"
                                                ></span>

                                                {/* <div className="user-profile-form-value"> */}
                                                <div
                                                    className="register_form-gender"

                                                    // onChange={handleChange}
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
                                                {/* </div> */}

                                                <input
                                                    className="register_input"
                                                    value={username}
                                                    type="text"
                                                    placeholder="Tài khoản"
                                                    onChange={(e) =>
                                                        setUsername(e.target.value)
                                                    }
                                                    onBlur={blurUsername}
                                                />
                                                <span
                                                    className="register_span"
                                                    id="username"
                                                ></span>
                                                {/* <Input
                                value={email}
                                type="email"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={blurEmail}
                            />
                            <Span id="email"></Span> */}
                                                <input
                                                    className="register_input"
                                                    value={password}
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    onBlur={blurPassword}
                                                    id="mk"
                                                />
                                                <span
                                                    className="register_span"
                                                    id="password"
                                                ></span>
                                                <input
                                                    className="register_input"
                                                    value={succesPw}
                                                    onChange={(e) =>
                                                        setSuccesPw(e.target.value)
                                                    }
                                                    type="password"
                                                    placeholder="Xác thực mật khẩu"
                                                    onBlur={blurConfirmPassword}
                                                />
                                                <span
                                                    className="register_span"
                                                    id="confirm_password"
                                                ></span>

                                                {/* <Span id="succes"></Span> */}

                                                <button
                                                    className="register_button"
                                                    disabled={
                                                        // !email || !password || !username || !succesPw
                                                        !password ||
                                                        !username ||
                                                        !succesPw
                                                    }
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
                                            {/* </div> */}

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

// const handleClick = (e) => {
//     e.preventDefault();
//     register(dispatch, { username, password, email }, navigate);

//     // if (confirmName && confirmEmail && confirmPassword && confirmSuccessPassword) {
//     //     register(dispatch, { username, password, email }, navigate);
//     // } else {
//     //     document.getElementById('succes').innerHTML =
//     //         'Vui lòng nhập đầy đủ các trường';
//     // }
// };

// const blurUsername = (e) => {
//     // if (!e.target.value) {
//     //     document.getElementById('username').innerHTML = 'Vui lòng nhập trường này';
//     //     setConfirmName(false);
//     // } else {
//     //     document.getElementById('username').innerHTML = '';
//     //     document.getElementById('succes').innerHTML = '';
//     //     setConfirmName(true);
//     // }
// };

// const blurEmail = (e) => {
//     // var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     // if (!e.target.value) {
//     //     document.getElementById('email').innerHTML = 'Vui lòng nhập trường này';
//     //     setConfirmEmail(false);
//     // } else if (!regex.test(e.target.value)) {
//     //     document.getElementById('email').innerHTML = 'Trường này phải là email';
//     //     setConfirmEmail(false);
//     // } else {
//     //     document.getElementById('email').innerHTML = '';
//     //     setConfirmEmail(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };

// const blurPassword = (e) => {
//     // if (e.target.value.length < 6) {
//     //     document.getElementById('password').innerHTML =
//     //         'Vui lòng nhập tối thiểu 6 kí tự';
//     //     setConfirmPassword(false);
//     // } else {
//     //     document.getElementById('password').innerHTML = '';
//     //     setConfirmPassword(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };
// const blurConfirmPassword = (e) => {
//     // let mk = document.getElementById('mk');
//     // console.log(mk.value);
//     // if (!e.target.value) {
//     //     document.getElementById('confirm_password').innerHTML =
//     //         'Vui lòng nhập trường này';
//     //     setConfirmSuccessPassword(false);
//     // } else if (!(e.target.value === mk.value)) {
//     //     document.getElementById('confirm_password').innerHTML =
//     //         'Mật khẩu nhập lại không chính xác';
//     //     setConfirmSuccessPassword(false);
//     // } else {
//     //     document.getElementById('confirm_password').innerHTML = '';
//     //     setConfirmSuccessPassword(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };

// // useEffect(() => {
// //     if (!(confirmName && confirmEmail && confirmPassword && confirmSuccessPassword)) {
// //         document.getElementById('succes').innerHTML =
// //             'Vui lòng nhập đầy đủ các trường';
// //     }
// // }, [confirmName, confirmEmail, confirmPassword, confirmSuccessPassword]);

// return (
//     <div>
//         <Header>
//             <HeaderContai>
//                 <Link to="/">
//                     <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
//                 </Link>
//                 <HeaderTitle>Đăng kí</HeaderTitle>
//             </HeaderContai>
//             <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
//         </Header>
//         <Container>
//             <Wrapper>
//                 <Title style={{ marginBottom: '30px' }}>Đăng ký</Title>
//                 <Form>
//                     {/* Email */}

//                     {confirm ? (
//                         <FormInput>
//                             <Input
//                                 value={username}
//                                 type="text"
//                                 placeholder="Tên tài khoản"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 onBlur={blurUsername}
//                             />
//                             <Span id="username"></Span>
//                             <Input
//                                 value={email}
//                                 type="email"
//                                 placeholder="email"
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 onBlur={blurEmail}
//                             />
//                             <Span id="email"></Span>
//                             <Input
//                                 value={password}
//                                 type="password"
//                                 placeholder="Nhập mật khẩu"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onBlur={blurPassword}
//                                 id="mk"
//                             />
//                             <Span id="password"></Span>
//                             <Input
//                                 value={succesPw}
//                                 onChange={(e) => setSuccesPw(e.target.value)}
//                                 type="password"
//                                 placeholder="Nhập lại mật khẩu"
//                                 onBlur={blurConfirmPassword}
//                             />
//                             <Span id="confirm_password"></Span>

//                             {/* <Span id="succes"></Span> */}

//                             <Button
//                                 disabled={
//                                     !email || !password || !username || !succesPw
//                                 }
//                                 onClick={handleClick}
//                             >
//                                 ĐĂNG KÝ
//                             </Button>
//                         </FormInput>
//                     ) : (
//                         <FormInput>
//                             <Input
//                                 type="text"
//                                 placeholder="Gmail"
//                                 onChange={(e) => setGmail(e.target.value)}
//                                 value={gmail}
//                                 onBlur={blurEmail}
//                             />
//                             <Span id="email"></Span>
//                             <Button
//                                 style={{ marginTop: '30px' }}
//                                 disabled={!gmail}
//                                 onClick={handleClick}
//                             >
//                                 TIẾP THEO
//                             </Button>
//                         </FormInput>
//                     )}

//                     <Agreement>
//                         Bằng cách tạo một tài khoản, tôi đồng ý với việc xử lý dữ liệu
//                         cá nhân của mình theo
//                         <b
//                             style={{
//                                 color: '#ee4d2d',
//                                 fontSize: '11px',
//                                 marginLeft: '3px',
//                             }}
//                         >
//                             ĐIỀU KHOẢN DỊCH VỤ
//                         </b>{' '}
//                         &{' '}
//                         <b style={{ color: '#ee4d2d', fontSize: '11px' }}>
//                             CHÍNH SÁCH BẢO MẬT
//                         </b>
//                     </Agreement>

//                     <Text>
//                         Bạn đã có tài khoản?
//                         <Link style={{ textDecoration: 'none' }} to="/login">
//                             <TextLine>Đăng nhập</TextLine>
//                         </Link>
//                     </Text>
//                 </Form>
//             </Wrapper>
//         </Container>
//     </div>
// );
// };

// export default Register;
