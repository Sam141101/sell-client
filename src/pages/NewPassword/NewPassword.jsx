import { KeyboardBackspace } from '@mui/icons-material';
import axios from 'axios';
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
        // <div>
        //     <div className="new-password-header">
        //         <div className="new-password-header-container">
        //             <Link to="/">
        //                 <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
        //             </Link>
        //             <HeaderTitle>Đặt lại mật khẩu</HeaderTitle>
        //         </div>
        //         <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
        //     </div>
        //     <div className="new-password-container">
        //         <div className="new-password-wrapper">
        //             <div className="new-password-block-header">
        //                 <Link
        //                     to="/login"
        //                     style={{ textDecoration: 'none', color: 'red' }}
        //                 >
        //                     <KeyboardBackspace className="new-password-icon-left" />
        //                 </Link>
        //                 <h1 className="new-password-title">Mật khẩu mới</h1>
        //             </div>
        //             <div className="new-password-form">
        //                 <div>{email}</div>
        //                 <div className="new-password-form-input">
        //                     <input
        //                         className="new-password-input"
        //                         type="text"
        //                         placeholder="Mật khẩu mới"
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         value={password}
        //                         // onBlur={blurEmail}
        //                     />

        //                     <input
        //                         className="new-password-input"
        //                         type="text"
        //                         placeholder="Nhập lại mật khẩu"
        //                         onChange={(e) => setPasswordConfirm(e.target.value)}
        //                         value={passwordConfirm}
        //                         // onBlur={blurEmail}
        //                     />
        //                     {msg && (
        //                         <span className="new-password-span" id="email">
        //                             {msg}
        //                         </span>
        //                     )}
        //                     <button
        //                         className="new-password-button"
        //                         style={{ marginTop: '30px' }}
        //                         disabled={!email}
        //                         onClick={handleClick}
        //                     >
        //                         ĐỒNG Ý
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <>
            {validUrl ? (
                <div>
                    <div className="new-password-header">
                        <div className="new-password-header-container">
                            <Link to="/">
                                <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                            </Link>
                            <HeaderTitle>Đặt lại mật khẩu</HeaderTitle>
                        </div>
                        <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
                    </div>
                    <div className="new-password-container">
                        <div className="new-password-wrapper">
                            <div className="new-password-block-header">
                                <Link
                                    to="/login"
                                    style={{ textDecoration: 'none', color: 'red' }}
                                >
                                    <KeyboardBackspace className="new-password-icon-left" />
                                </Link>
                                <h1 className="new-password-title">Mật khẩu mới</h1>
                            </div>
                            <div className="new-password-form">
                                <div>{email}</div>
                                <div className="new-password-form-input">
                                    <input
                                        className="new-password-input"
                                        type="text"
                                        placeholder="Mật khẩu mới"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        // onBlur={blurEmail}
                                    />

                                    <input
                                        className="new-password-input"
                                        type="text"
                                        placeholder="Nhập lại mật khẩu"
                                        onChange={(e) =>
                                            setPasswordConfirm(e.target.value)
                                        }
                                        value={passwordConfirm}
                                        // onBlur={blurEmail}
                                    />
                                    {msg && (
                                        <span className="new-password-span" id="email">
                                            {msg}
                                        </span>
                                    )}
                                    <button
                                        className="new-password-button"
                                        style={{ marginTop: '30px' }}
                                        disabled={!email}
                                        onClick={handleClick}
                                    >
                                        ĐỒNG Ý
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default NewPassword;
