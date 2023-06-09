import { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPassword.css';

// --------------------------------------------------------------

const ForgotPassword = ({ BASE_URL_API, axios, setToast }) => {
    const [email, setEmail] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        let errorMessage = '';
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            errorMessage = 'Vui lòng nhập Email.';
        } else if (!regex.test(email)) {
            errorMessage = 'Email không hợp lệ!';
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

        try {
            const url = BASE_URL_API + `auth/forgot-password`;
            const { data: res } = await axios.post(url, { email });
            setToast({
                show: true,
                title: res.message,
                type: 'success',
                duration: 1200,
            });
        } catch (error) {
            setToast({
                show: true,
                title: 'xác thực email thất bại',
                type: 'error',
                duration: 1200,
            });
            console.log(error);
        }
    };

    return (
        <>
            <div className="email-verify-main">
                <div className="grid">
                    <div className="row">
                        <div className="col l-6 c-12">
                            <div className="email-verify-header">
                                <h1 className="email-verify-title">Đăng nhập</h1>
                            </div>
                        </div>

                        <div className="col l-6 c-12">
                            <div className="email-verify-container df jc">
                                <div className="email-verify-wrapper">
                                    <div className="email-verify-form df">
                                        <div className="email-verify-form-input df flex-direction">
                                            <div className="forgot-password-title-text">
                                                Phục hồi mật khẩu
                                            </div>
                                            <input
                                                className="email-verify-input"
                                                type="email"
                                                placeholder="Gmail"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />

                                            <div className="forgot-password-desc-police">
                                                This site is protected by reCAPTCHA and
                                                the Google
                                                <Link to="" className="nav-login-link">
                                                    Privacy Policy
                                                </Link>
                                                and
                                                <Link className="nav-login-link">
                                                    Terms of Service
                                                </Link>
                                                apply
                                            </div>

                                            <div className="forgot-password-buttons">
                                                <button
                                                    className="email-verify-button"
                                                    onClick={handleClick}
                                                >
                                                    Gửi
                                                </button>

                                                <Link
                                                    to="/login"
                                                    className="forgot-password-cancel"
                                                >
                                                    Huỷ
                                                </Link>
                                            </div>
                                        </div>
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

export default ForgotPassword;
